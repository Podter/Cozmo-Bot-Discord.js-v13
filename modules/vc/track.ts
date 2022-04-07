import { getInfo } from 'ytdl-core';
import { AudioResource, createAudioResource, demuxProbe } from '@discordjs/voice';
import { raw as ytdl } from 'youtube-dl-exec';

export interface TrackData {
	url: string;
	title: string;
	author: any;
	videoId: string;
	onStart: () => void;
	onFinish: () => void;
	onError: (error: Error) => void;
}

const noop = () => {};

export class Track implements TrackData {
	public readonly url: string;
	public readonly title: string;
	public readonly author: any;
	public readonly videoId: string;
	public readonly onStart: () => void;
	public readonly onFinish: () => void;
	public readonly onError: (error: Error) => void;

	private constructor({ url, title, author, videoId, onStart, onFinish, onError }: TrackData) {
		this.url = url;
		this.title = title;
		this.author = author;
		this.videoId = videoId;
		this.onStart = onStart;
		this.onFinish = onFinish;
		this.onError = onError;
	}

	public createAudioResource(): Promise<AudioResource<Track>> {
		return new Promise((resolve, reject) => {
			const process = ytdl(
				this.url,
				{
					//o: '-',
					//q: '',
					//f: 'worstaudio[ext=webm+acodec=opus+asr=48000]/worstaudio',
					//r: '100K',
					output: "-",
					quiet: true,
					format: 'worstaudio[ext=webm+acodec=opus+asr=48000]/worstaudio',
					limitRate: '100K',
				},
				{ stdio: ['ignore', 'pipe', 'ignore'] },
			);
			if (!process.stdout) {
				reject(new Error('No stdout'));
				return;
			}
			const stream = process.stdout;
			const onError = (error: Error) => {
				if (!process.killed) process.kill();
				stream.resume();
				reject(error);
			};
			process
				.once('spawn', () => {
					demuxProbe(stream)
						.then((probe) => resolve(createAudioResource(probe.stream, { metadata: this, inputType: probe.type })))
						.catch(onError);
				})
				.catch(onError);
		});
	}

	/**
	 * Creates a Track from a video URL and lifecycle callback methods.
	 *
	 * @param url The URL of the video
	 * @param methods Lifecycle callbacks
	 * @returns The created Track
	 */
	public static async from(url: string, methods: Pick<Track, 'onStart' | 'onFinish' | 'onError'>): Promise<Track> {
		const info = await getInfo(url);

		const wrappedMethods = {
			onStart() {
				wrappedMethods.onStart = noop;
				methods.onStart();
			},
			onFinish() {
				wrappedMethods.onFinish = noop;
				methods.onFinish();
			},
			onError(error: Error) {
				wrappedMethods.onError = noop;
				methods.onError(error);
			},
		};

		return new Track({
			title: info.videoDetails.title,
			author: info.videoDetails.author.name,
			videoId: info.videoDetails.videoId,
			url,
			...wrappedMethods,
		});
	}
}

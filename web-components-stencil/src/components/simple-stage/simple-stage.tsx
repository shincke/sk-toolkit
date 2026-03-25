import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'sk-simple-stage',
	styleUrl: './simple-stage.css',
	shadow: true,
})
export class SimpleStage {
	@Prop() heading: string = 'Simple Stage Title';
	@Prop() description: string = 'Simple stage description for a teaser section.';
	@Prop() ctaLabel: string = 'Learn more';

	@Prop() mediaType: 'image' | 'video' = 'image';
	@Prop() mediaSrc: string;
	@Prop() poster: string;
	@Prop() mediaAlt: string = 'Stage teaser media';

	@Prop() minHeight: string = '55vh';
	@Prop() maxHeight: string = '78vh';

	renderMedia() {
		if (this.mediaType === 'video') {
			return (
				<video
					class="media"
					src={this.mediaSrc}
					poster={this.poster}
					autoplay
					muted
					loop
					playsinline
				/>
			);
		}

		return <img class="media" src={this.mediaSrc} alt={this.mediaAlt} />;
	}

	render() {
		return (
			<section
				class="stage"
				style={{
					'--stage-min-height': this.minHeight,
					'--stage-max-height': this.maxHeight,
				}}
			>
				<div class="media-wrap">{this.renderMedia()}</div>

				<div class="overlay" />

				<div class="content">
					<h1>{this.heading}</h1>
					<p>{this.description}</p>
					<slot name="cta">
						<sk-button size="l" label={this.ctaLabel}></sk-button>
					</slot>
				</div>
			</section>
		);
	}
}

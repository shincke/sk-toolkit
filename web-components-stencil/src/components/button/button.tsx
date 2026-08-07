import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'sk-button',
	styleUrl: './button.css',
	shadow: true,
})
export class Button {
	@Prop({ reflect: true }) size: 's' | 'm' | 'l' = 'm';
	@Prop() label: string = 'Button';
	@Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';
	@Prop() ui: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link' = 'primary';
	@Prop({ reflect: true }) disabled: boolean = false;

	render() {
		return (
			<button
				class={`button button--${this.size} button--${this.ui}`}
				type={this.type}
				disabled={this.disabled}
			>
				<slot>{this.label}</slot>
			</button>
		);
	}
}

import { Component, h, Prop, State } from "@stencil/core";

// I could write inline styles here using the `styles` property
@Component({
  tag: "sk-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true, // it could be scoped too, however shadow is more performant
})
// extends HTMLElement will be done by Stencil in build process
export class SideDrawer {
  // adds an attribute to the HTML element <sk-side-drawer title="...">
  // watch for changes inside the component, not coming from parent
  @State() showContactInfo = false;
  @Prop({ reflect: true }) header: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot />; // default slot
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <sk-heading size="sm">Contact Information</sk-heading>
          <sk-text size="md">You can reach us via phone or email.</sk-text>
          <ul>
            <li>
              <sk-caption>Phone: 123-456-7890</sk-caption>
            </li>
            <li>
              <sk-caption>Email: something@something.pt</sk-caption>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <aside class="side-drawer">
        <header>
          <sk-heading size="md">{this.header}</sk-heading>
          {/* binding is necessary, so onClick refers to the class */}
          <button onClick={this.onCloseDrawer.bind(this)} aria-label="Close drawer">
            <sk-icon name="close" size={20} aria-label={undefined} />
          </button>
        </header>
        <section id="tabs">
          <button onClick={this.onContentChange.bind(this, 'nav')} class="active">
            <sk-caption>Navigation</sk-caption>
          </button>
          <button onClick={this.onContentChange.bind(this, 'contact')}>
            <sk-caption>Contact</sk-caption>
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }
}
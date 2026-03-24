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
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 123-456-7890</li>
            <li>Email: something@something.pt</li>
          </ul>
        </div>
      );
    }

    return (
      <aside class="side-drawer">
        <header>
          <h1>{this.header}</h1>
          {/* binding is necessary, so onClick refers to the class */}
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button onClick={this.onContentChange.bind(this, 'nav')} class="active">Navigation</button>
          <button onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }
}
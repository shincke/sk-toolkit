import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { renderImagePlaceholder } from '../../utils/image-placeholder';

@Component({
  tag: 'sk-record-card',
  styleUrl: './sk-record-card.css',
  shadow: true,
})
export class SkRecordCard {
  @Prop({ reflect: true }) variant: 'list' | 'grid' | 'detail' = 'grid';
  @Prop({ attribute: 'title' }) recordTitle = '';
  @Prop() artist = '';
  @Prop() year = '';
  @Prop() label = '';
  @Prop() genre = '';
  @Prop() condition: 'VERY GOOD' | 'GOOD' | 'RARE' | 'NM' | 'VG' | 'VG+' | 'G' | '' = '';
  @Prop() price = 0;
  @Prop() imageSrc = '';
  @Prop() imageAlt = '';
  @Prop({ reflect: true }) inStock = true;
  @Prop({ attribute: 'aria-label' }) accessibleLabel?: string;

  @Event() skAddToSelection!: EventEmitter<MouseEvent | KeyboardEvent>;

  private handleActivate = (event: MouseEvent | KeyboardEvent) => {
    if (!this.inStock) {
      return;
    }

    this.skAddToSelection.emit(event);
  };

  private handleRootClick = (event: MouseEvent) => {
    this.handleActivate(event);
  };

  private handleButtonClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.handleActivate(event);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.handleActivate(event);
  };

  private getAccessibleLabel(): string {
    return this.accessibleLabel || `${this.recordTitle}${this.artist ? ` by ${this.artist}` : ''}` || 'Record card';
  }

  private getPriceLabel(): string {
    return `$${this.price}`;
  }

  private getGenreTokens(): string[] {
    return this.genre
      .split(/[,|]/)
      .map((token) => token.trim())
      .filter(Boolean);
  }

  private renderChips(values: string[]) {
    return values.map((value) => (
      <sk-badge variant="category" color={value === this.condition ? 'accent' : 'default'} label={value}></sk-badge>
    ));
  }

  private getConditionColor(): 'success' | 'warning' | 'accent' | 'secondary' {
    const condition = this.condition.toUpperCase();
    if (condition === 'NM') return 'success';
    if (condition.includes('VG')) return 'success';
    if (condition === 'G' || condition === 'GOOD') return 'warning';
    if (condition === 'RARE') return 'accent';
    return 'secondary';
  }

  private renderImage(imageClass = 'media') {
    return this.imageSrc ? <img class={imageClass} src={this.imageSrc} alt={this.imageAlt} /> : renderImagePlaceholder();
  }

  private renderList() {
    return (
      <div class="variant-list">
        <div class="thumb-wrap">{this.renderImage('thumb')}</div>

        <div class="content">
          <div class="content-main">
            <div class="title-row">
              <sk-heading size="sm" class="title">
                {this.recordTitle}
              </sk-heading>
              <sk-text size="lg" class="price price-inline">{this.getPriceLabel()}</sk-text>
            </div>
            <sk-caption class="artist">{this.artist}</sk-caption>
          </div>
        </div>
      </div>
    );
  }

  private renderGrid() {
    return (
      <div class="variant-grid">
        <div class="media-wrap">{this.renderImage()}</div>

        <div class="content">
          <sk-caption class="artist">{this.artist}</sk-caption>
          <sk-heading size="sm" class="title">
            {this.recordTitle}
          </sk-heading>

          <div class="footer-row">
            {this.condition && <sk-badge variant="status" color={this.getConditionColor()} label={this.condition}></sk-badge>}
            <sk-text size="lg" class="price">{this.getPriceLabel()}</sk-text>
          </div>
        </div>
      </div>
    );
  }

  private renderDetail() {
    const genreTokens = this.getGenreTokens();
    const tags = [this.label, this.year, this.condition].filter(Boolean);

    return (
      <div class="variant-detail">
        <div class="media-wrap media-wrap-detail">{this.renderImage()}</div>

        <div class="content content-detail">
          <sk-caption class="artist">{this.artist}</sk-caption>
          <sk-heading size="display" class="title title-detail">
            {this.recordTitle}
          </sk-heading>

          <div class="meta-row meta-row-detail">{this.renderChips(tags)}</div>

          {genreTokens.length ? <div class="genre-row">{this.renderChips(genreTokens)}</div> : null}

          <div class="footer-row footer-row-detail">
            <sk-caption class="price price-detail">{this.getPriceLabel()}</sk-caption>
            <sk-button variant="primary" size="lg" onClick={this.handleButtonClick} disabled={!this.inStock}>
              {this.inStock ? 'Add to selection' : 'Sold out'}
            </sk-button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host
        role="button"
        tabindex="0"
        aria-label={this.getAccessibleLabel()}
        aria-disabled={this.inStock ? 'false' : 'true'}
        class={{
          card: true,
          [`variant-${this.variant}`]: true,
          'is-out-of-stock': !this.inStock,
        }}
        onClick={this.handleRootClick}
        onKeyDown={this.handleKeyDown}
      >
        <article class="record-card">
          {this.variant === 'list' ? this.renderList() : null}
          {this.variant === 'grid' ? this.renderGrid() : null}
          {this.variant === 'detail' ? this.renderDetail() : null}
        </article>
      </Host>
    );
  }
}
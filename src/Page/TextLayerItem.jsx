import React, { PureComponent } from 'react';

import PageContext from '../PageContext';

export class TextLayerItemInternal extends PureComponent {
  componentDidMount() {
    this.alignTextItem();
  }

  componentDidUpdate() {
    this.alignTextItem();
  }

  get unrotatedViewport() {
    const { page, scale } = this.props;

    return page.getViewport({ scale });
  }

  /**
   * It might happen that the page is rotated by default. In such cases, we shouldn't rotate
   * text content.
   */
  get rotate() {
    const { page, rotate } = this.props;
    return rotate - page.rotate;
  }

  get sideways() {
    const { rotate } = this;
    return rotate % 180 !== 0;
  }

  get defaultSideways() {
    const { rotation } = this.unrotatedViewport;
    return rotation % 180 !== 0;
  }

  get fontSize() {
    const { transform } = this.props;
    const { defaultSideways } = this;
    const [fontHeightPx, fontWidthPx] = transform;
    return defaultSideways ? fontWidthPx : fontHeightPx;
  }

  get top() {
    const { transform } = this.props;
    const { unrotatedViewport: viewport, defaultSideways } = this;
    const [/* fontHeightPx */, /* fontWidthPx */, offsetX, offsetY, x, y] = transform;
    const [/* xMin */, yMin, /* xMax */, yMax] = viewport.viewBox;
    return defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY);
  }

  get left() {
    const { transform } = this.props;
    const { unrotatedViewport: viewport, defaultSideways } = this;
    const [/* fontHeightPx */, /* fontWidthPx */, /* offsetX */, /* offsetY */, x, y] = transform;
    const [xMin] = viewport.viewBox;
    return defaultSideways ? y - xMin : x - xMin;
  }

  getFontData(fontName) {
    const { page } = this.props;

    return new Promise((resolve) => {
      page.commonObjs.get(fontName, resolve);
    });
  }

  alignTextItem() {
    const element = this.item;

    if (!element) {
      return;
    }

    element.style.transform = '';

    const { fontName, scale, width } = this.props;

    element.style.fontFamily = `${fontName}, sans-serif`;

    this.getFontData(fontName)
      .then((fontData) => {
        const fallbackFontName = fontData ? fontData.fallbackName : 'sans-serif';
        element.style.fontFamily = `${fontName}, ${fallbackFontName}`;

        const targetWidth = width * scale;
        const actualWidth = this.getElementWidth(element);

        let transform = `scaleX(${targetWidth / actualWidth})`;

        const ascent = fontData ? fontData.ascent : 0;
        if (ascent) {
          transform += ` translateY(${(1 - ascent) * 100}%)`;
        }

        element.style.transform = transform;
        element.style.WebkitTransform = transform;
      });
  }

  getElementWidth = (element) => {
    const { sideways } = this;
    return element.getBoundingClientRect()[sideways ? 'height' : 'width'];
  };

  render() {
    const { fontSize, top, left } = this;
    const { customTextRenderer, scale, str: text } = this.props;

    return (
      <span
        ref={(ref) => { this.item = ref; }}
        style={{
          height: '1em',
          fontFamily: 'sans-serif',
          fontSize: `${fontSize * scale}px`,
          position: 'absolute',
          top: `${top * scale}px`,
          left: `${left * scale}px`,
          transformOrigin: 'left bottom',
          whiteSpace: 'pre',
          pointerEvents: 'all',
        }}
      >
        {
          customTextRenderer
            ? customTextRenderer(this.props)
            : text
        }
      </span>
    );
  }
}

export default function TextLayerItem(props) {
  return (
    <PageContext.Consumer>
      {(context) => <TextLayerItemInternal {...context} {...props} />}
    </PageContext.Consumer>
  );
}

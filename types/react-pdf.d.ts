import type * as pdfjs  from 'pdfjs-dist';

import Document, { Props as DocumentProps, LoadingProcessData } from './Document';
import Outline, { Props as OutlineProps } from './Outline';
import Page, { Props as PageProps, PDFPageItem, TextLayerItemInternal, TextItem, PDFPageProxy } from './Page';

export {
  pdfjs,
  Document,
  DocumentProps,
  LoadingProcessData,
  Outline,
  OutlineProps,
  Page,
  PageProps,
  PDFPageItem,
  TextLayerItemInternal,
  TextItem,
  PDFPageProxy
}

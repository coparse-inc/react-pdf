import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import type * as React from 'react';

type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type OutlineNode = UnPromisify<ReturnType<PDFDocumentProxy['getOutline']>>

export interface Props {
    /**
     * Defines custom class name(s), that will be added to rendered element.
     * @default 'react-pdf__Outline'
     */
    className?: string | string[] | undefined;

    /**
     * Function called when an outline item has been clicked.
     * Usually, you would like to use this callback to move the user wherever they requested to.
     */
    onItemClick?: (({ pageNumber }: { pageNumber: string }) => void) | undefined;

    /**
     * Function called in case of an error while retrieving the outline.
     */
    onLoadError?: ((error: Error) => void) | undefined;

    /**
     * Function called when the outline is successfully retrieved.
     */
    onLoadSuccess?: ((outline: OutlineNode[]) => void) | undefined;
}

export default class Outline extends React.Component<Props> { }

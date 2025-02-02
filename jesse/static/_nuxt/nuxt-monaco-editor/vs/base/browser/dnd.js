import { Mimes } from '../common/mime.js';
// Common data transfers
export const DataTransfers = {
    /**
     * Application specific resource transfer type
     */
    RESOURCES: 'ResourceURLs',
    /**
     * Browser specific transfer type to download
     */
    DOWNLOAD_URL: 'DownloadURL',
    /**
     * Browser specific transfer type for files
     */
    FILES: 'Files',
    /**
     * Typically transfer type for copy/paste transfers.
     */
    TEXT: Mimes.text,
    /**
     * Internal type used to pass around text/uri-list data.
     *
     */
    INTERNAL_URI_LIST: 'application/vnd.code.uri-list',
};

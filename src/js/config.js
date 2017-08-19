//Initial state used to hydrate the store
export const initialState = {
    dimensions: {},
    zoomed: false,
    images: {
        product: 'https://bonobos-prod-s3.imgix.net/products/18158/original/SHIRT_ShortSleeve_ZebraRun_JetBlack_hero1.jpg',
        zoomIn: 'https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-in.svg',
        zoomOut: 'https://bnbs-gramercy-public.s3.amazonaws.com/homework/zoom-out.svg'
    },
    zoomPos: {
        x: 0,
        y: 0
    }
}

//Default values for application content
export const defaults = {
    maxImageWidth: 700
}
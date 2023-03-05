import localFont from "@next/font/local"

export const interFont = localFont({
  variable: '--font-inter',
  preload: true,
  src: [
    {
      path: './inter/Inter-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './inter/Inter-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './inter/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './inter/Inter-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './inter/Inter-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './inter/Inter-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
})

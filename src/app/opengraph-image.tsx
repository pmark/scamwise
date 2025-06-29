import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ScamWise - Your Personal Scam-Spotting Coach';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OgImage() {
  const interRegular = await fetch(
    new URL('https://rsms.me/inter/font-files/Inter-Regular.woff2')
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL('https://rsms.me/inter/font-files/Inter-Bold.woff2')
  ).then((res) => res.arrayBuffer());


  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'hsl(48, 20%, 95%)',
          fontFamily: '"Inter"',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <svg
                width="110"
                height="110"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="hsl(48, 75%, 50%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
            </svg>
            <h1
            style={{
                fontSize: '100px',
                fontWeight: 700,
                color: 'hsl(48, 75%, 50%)',
                margin: 0,
            }}
            >
            ScamWise
            </h1>
        </div>
        <p
            style={{
                fontSize: '40px',
                maxWidth: '80%',
                textAlign: 'center',
                color: 'hsl(240, 5%, 45.1%)',
                marginTop: '30px',
                fontWeight: 400,
            }}
        >
            Trust Your Instincts. We'll Help You Verify Them.
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
            name: 'Inter',
            data: interBold,
            style: 'normal',
            weight: 700,
        }
      ],
    }
  );
}

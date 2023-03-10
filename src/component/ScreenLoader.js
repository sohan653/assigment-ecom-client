import React from 'react';
import { css } from '@emotion/react';
import { BarLoader } from 'react-spinners';

const ScreenLoader = () => {
    const loaderCss = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    return (
        <div className="fixed inset-0 h-screen opacity-25 z-50 bg-gray-900 flex justify-center items-center">
            <BarLoader css={loaderCss} color="#fff" loading={true} height={20} width={500} />
        </div>
    );
};

export default ScreenLoader;
import { useState } from 'react';
import Tippy from '@tippyjs/react'

const Avatar = (props) => {
    const { tippy, src, ...rest } = props;
    const [avatar, setAvatar] = useState(src);
    const [error, setError] = useState(false);

    return <Tippy disabled={tippy ? false : true} content={tippy ? tippy : 'Tippy disabled for this image.'}><img
        src={avatar}
        onError={() => {
            setAvatar('/img/logo.png')
            if(!error) setError(true);
        }}
        {...rest}
    /></Tippy>
}

export default Avatar;
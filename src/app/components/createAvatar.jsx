import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';



const Avatar = ({seed}) => {
    const avatar = createAvatar(initials, {
        // ... options
        seed: seed,
        radius : 50,
        backgroundType: ["gradientLinear","solid"],
        backgroundColor: ["141d2b"],
        size: 40
    });
      
    const svg = avatar.toString();

    return (
        <div dangerouslySetInnerHTML={{__html: svg}} />
    );
      
}

export default Avatar;
export const preloadAssets = () => {
    const tiers = [
        ['/first section.png'],
        ['/haldi.png', '/mehendi.png', '/sangeet.png'],
        ['/shaadi.png', '/reception.png', '/carousel1.png', '/carousel2.png', '/carousel3.png']
    ];

    const loadTier = (tierIndex) => {
        if (tierIndex >= tiers.length) return;

        const promises = tiers[tierIndex].map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // Continue even if one fails
            });
        });

        Promise.all(promises).then(() => {
            console.log(`Tier ${tierIndex + 1} loaded`);
            setTimeout(() => loadTier(tierIndex + 1), 500); // 500ms delay between tiers
        });
    };

    loadTier(0);
};

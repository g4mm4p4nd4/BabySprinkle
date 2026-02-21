export const getEnvConfig = () => {
    const rsvpEndpoint = import.meta.env.VITE_RSVP_ENDPOINT;
    const isProd = import.meta.env.MODE === 'production';

    return {
        rsvpEndpoint,
        isProd,
        isValidRsvpEndpoint: Boolean(rsvpEndpoint && rsvpEndpoint.startsWith('http')),
    };
};

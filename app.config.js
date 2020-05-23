export default ({ config }) => {
  return {
    ...config,
    extra: {
      auth: {
        base: 'https://github.com/login/oauth',
        id: '051bf948d5685bc3b4e8',
        secret: 'b7ac2b32c0ba9a2721e14e93d15d65675ff3e7c5',
        scope: [
          'user',
          'public_repo',
          'repo',
          'repo_deployment',
          'repo:status',
          'read:repo_hook',
          'read:org',
          'read:public_key',
          'read:gpg_key'
        ],
      },
      api: {
        base: 'https://api.github.com/graphql',
      },
    },
  };
};

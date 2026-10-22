const { spawn } = require('child_process');

export const setupTestServer = async () => {
    // Finish building fixtures before Jest imports them. Use Node directly so
    // Windows does not need to execute npm.cmd through a shell.
    await new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [
            require.resolve('webpack-cli/bin/cli.js'),
            '--mode=production',
            '--config',
            './config/webpack.test.config.js'
        ], { cwd: require('path').resolve(__dirname, '../..'), stdio: 'inherit' });
        child.once('error', reject);
        child.once('exit', (code, signal) => {
            if (code === 0) resolve();
            else reject(new Error(`Test fixture build failed (${signal || code})`));
        });
    });
};

export const teardownTestServer = async () => {
};

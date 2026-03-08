import {program} from 'commander';

program
    .requiredOption('--root <path>',"path to watch")
    .requiredOption('--build <command>', "build command")
    .requiredOption('--exec <command>',"start command")

program.parse();

const opt = program.opts();
const Root = opt.root;
const build = opt.build;
const run = opt.exec;

export {Root, build, run};




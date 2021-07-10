#!/usr/bin/env node

import 'module-alias/register';
import 'source-map-support/register';
import { start } from '../src/main';

const arg = process.argv[2];

start(arg);

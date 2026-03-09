import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { Buffer } from 'buffer';
import { TextEncoder, TextDecoder } from 'text-encoding';
import process from 'process';

globalThis.Buffer = Buffer;
globalThis.process = process;

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
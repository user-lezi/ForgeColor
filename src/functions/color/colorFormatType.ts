import { NativeFunction, Arg } from '@tryforge/forgescript';
import { detectColorFormat } from '../../helpers/detectColorType';

export default new NativeFunction({
  name: '$colorFormatType',
  aliases: ['$getColorFormat', '$detectColorFormat'], 
  description: 'Returns the format of a given color code (hex, rgb, rgba, hsl, etc).',
  version: '1.0.0',
  brackets: true,
  unwrap: true,
  args: [
    Arg.requiredString('code', 'The color code to get the format of'),
  ],
  async execute(ctx, [code]) {
    const format = detectColorFormat(code);
    return this.success(format ?? 'unknown');
  }
});

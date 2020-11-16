/*
Language: z80 Assembly
Author: Eldred Habert <eldredhabert0@gmail.com>
Description: Stock Z80 Assembly using TASM syntax
Category: assembler
*/

function z80_lang(hljs) {
    return {
        case_insensitive: true,
        aliases: ['z80'],
        lexemes: '[\\.#]?' + hljs.IDENT_RE,
        keywords: {
            directives:
            // TASM directives
                '.addinstr .avsym .block .byte .chk .codes .db .dw #define #defcont .echo .eject #else .end #endif .equ .export .fill #ifdef #ifndef #if #include .list .locallabelchar .lsfirst .module .msfirst .nocodes .nolist .nopage .org .page .set .sym .text .title .word ' +
                '.bseg .cseg .dseg .nseg .xseg', // Segment directives
            registers:
                'a f b c d e h l ' + // 8bit registers
                'af bc de hl ix iy pc sp ' + // 16bit registers
                '$', // Alias for PC
            conditionals:
                'c nc z nz m p pe po' // Conditionals for call, jp, jr and ret
        },
        contains: [
            {
                className: 'instruction',
                begin: '\\s(' +     // TASM's spec explicitely says an instruction must start after a whitespace
                    'adc|add|and|bit|call|ccf|cp|cpd|cpdr|cpi|cpir|cpl|daa|dec|di|' +
                    'djnz|ei|ex|exx|halt|im|in|inc|ind|indr|ini|inir|jp|jr|ld|ldd|lddr|' +
                    'ldi|ldir|neg|nop|or|otdr|otir|out|outd|outi|pop|push|res|ret|reti|' +
                    'retn|rl|rla|rlc|rlca|rld|rr|rra|rrc|rrca|rrd|rst|sbc|set|sub' +
                    ')',
                end: '\\s'
            },
            hljs.COMMENT(';', '$', {relevance: 0}),
            hljs.QUOTE_STRING_MODE,
            {
                className: 'number',
                variants: [
                    {begin: '\\$[0-9a-f]+'}, // hex
                    {begin: '%[01]+'},       // bin
                    {begin: '\\b\\d+'}       // bare number
                ],
                relevance: 0
            }
        ]
    };
}

function Z80(moo) {
    Reveal.addEventListener('ready', (event) => {
        hljs.registerLanguage("ampl",function(e){var r="([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";return {c: [ e.HCM,e.CBCM,{b:r,l:r,k:{keyword:"maximize subject to var ",literal:""},r:90},{cN:"number",b:"\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",r:0}]} });

        // console.log(hljs.listLanguages());
        document.querySelectorAll('pre code').forEach((block) => { hljs.highlightBlock(block); });
    });

    console.log(moo, arguments);
    hljs.registerLanguage(z80_lang(hljs));
}
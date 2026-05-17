```hdl
// 1-bit NOT gate
// 입력: in
// 출력: in의 반대값
CHIP Not {
    IN in;
    OUT out;

    PARTS:
    Nand(a=in, b=in, out=out);
}
```

```hdl
// 1-bit AND gate
// 입력: a, b
// 출력: a AND b
CHIP And {
    IN a, b;
    OUT out;

    PARTS:
    Nand(a=a, b=b, out=nandOut);
    Not(in=nandOut, out=out);
}
```

```hdl
// 1-bit OR gate
// 입력: a, b
// 출력: a OR b
// De Morgan's law: a OR b = NOT(NOT(a) AND NOT(b))
CHIP Or {
    IN a, b;
    OUT out;

    PARTS:
    Not(in=a, out=notA);
    Not(in=b, out=notB);
    Nand(a=notA, b=notB, out=out);
}
```

```hdl
// 1-bit XOR gate
// 입력: a, b
// 출력: a XOR b (a와 b가 다를 때 1)
// a XOR b = (a OR b) AND NOT(a AND b)
CHIP Xor {
    IN a, b;
    OUT out;

    PARTS:
    Or(a=a, b=b, out=orOut);
    Nand(a=a, b=b, out=nandOut);
    And(a=orOut, b=nandOut, out=out);
}
```

```hdl
// 1-bit 2-to-1 Multiplexer
// 입력: a, b, sel (selector)
// 출력: sel=0이면 a, sel=1이면 b
CHIP Mux {
    IN a, b, sel;
    OUT out;

    PARTS:
    Not(in=sel, out=notSel);
    And(a=a, b=notSel, out=aAndNotSel);
    And(a=b, b=sel, out=bAndSel);
    Or(a=aAndNotSel, b=bAndSel, out=out);
}
```

```hdl
// 1-bit 1-to-2 Demultiplexer
// 입력: in, sel (selector)
// 출력: sel=0이면 a=in, sel=1이면 b=in
CHIP DMux {
    IN in, sel;
    OUT a, b;

    PARTS:
    Not(in=sel, out=notSel);
    And(a=in, b=notSel, out=a);
    And(a=in, b=sel, out=b);
}
```

```hdl
// 16-bit NOT gate
// 입력: in[16]
// 출력: in의 모든 비트를 반전
CHIP Not16 {
    IN in[16];
    OUT out[16];

    PARTS:
    Not(in=in[0], out=out[0]);
    Not(in=in[1], out=out[1]);
    Not(in=in[2], out=out[2]);
    Not(in=in[3], out=out[3]);
    Not(in=in[4], out=out[4]);
    Not(in=in[5], out=out[5]);
    Not(in=in[6], out=out[6]);
    Not(in=in[7], out=out[7]);
    Not(in=in[8], out=out[8]);
    Not(in=in[9], out=out[9]);
    Not(in=in[10], out=out[10]);
    Not(in=in[11], out=out[11]);
    Not(in=in[12], out=out[12]);
    Not(in=in[13], out=out[13]);
    Not(in=in[14], out=out[14]);
    Not(in=in[15], out=out[15]);
}
```

```hdl
// 16-bit AND gate
// 입력: a[16], b[16]
// 출력: 각 비트별 AND 결과
CHIP And16 {
    IN a[16], b[16];
    OUT out[16];

    PARTS:
    And(a=a[0], b=b[0], out=out[0]);
    And(a=a[1], b=b[1], out=out[1]);
    And(a=a[2], b=b[2], out=out[2]);
    And(a=a[3], b=b[3], out=out[3]);
    And(a=a[4], b=b[4], out=out[4]);
    And(a=a[5], b=b[5], out=out[5]);
    And(a=a[6], b=b[6], out=out[6]);
    And(a=a[7], b=b[7], out=out[7]);
    And(a=a[8], b=b[8], out=out[8]);
    And(a=a[9], b=b[9], out=out[9]);
    And(a=a[10], b=b[10], out=out[10]);
    And(a=a[11], b=b[11], out=out[11]);
    And(a=a[12], b=b[12], out=out[12]);
    And(a=a[13], b=b[13], out=out[13]);
    And(a=a[14], b=b[14], out=out[14]);
    And(a=a[15], b=b[15], out=out[15]);
}
```

```hdl
// 16-bit OR gate
// 입력: a[16], b[16]
// 출력: 각 비트별 OR 결과
CHIP Or16 {
    IN a[16], b[16];
    OUT out[16];

    PARTS:
    Or(a=a[0], b=b[0], out=out[0]);
    Or(a=a[1], b=b[1], out=out[1]);
    Or(a=a[2], b=b[2], out=out[2]);
    Or(a=a[3], b=b[3], out=out[3]);
    Or(a=a[4], b=b[4], out=out[4]);
    Or(a=a[5], b=b[5], out=out[5]);
    Or(a=a[6], b=b[6], out=out[6]);
    Or(a=a[7], b=b[7], out=out[7]);
    Or(a=a[8], b=b[8], out=out[8]);
    Or(a=a[9], b=b[9], out=out[9]);
    Or(a=a[10], b=b[10], out=out[10]);
    Or(a=a[11], b=b[11], out=out[11]);
    Or(a=a[12], b=b[12], out=out[12]);
    Or(a=a[13], b=b[13], out=out[13]);
    Or(a=a[14], b=b[14], out=out[14]);
    Or(a=a[15], b=b[15], out=out[15]);
}
```

```hdl
// 16-bit 2-to-1 Multiplexer
// 입력: a[16], b[16], sel
// 출력: sel=0이면 a, sel=1이면 b (모든 16비트)
CHIP Mux16 {
    IN a[16], b[16], sel;
    OUT out[16];

    PARTS:
    Mux(a=a[0], b=b[0], sel=sel, out=out[0]);
    Mux(a=a[1], b=b[1], sel=sel, out=out[1]);
    Mux(a=a[2], b=b[2], sel=sel, out=out[2]);
    Mux(a=a[3], b=b[3], sel=sel, out=out[3]);
    Mux(a=a[4], b=b[4], sel=sel, out=out[4]);
    Mux(a=a[5], b=b[5], sel=sel, out=out[5]);
    Mux(a=a[6], b=b[6], sel=sel, out=out[6]);
    Mux(a=a[7], b=b[7], sel=sel, out=out[7]);
    Mux(a=a[8], b=b[8], sel=sel, out=out[8]);
    Mux(a=a[9], b=b[9], sel=sel, out=out[9]);
    Mux(a=a[10], b=b[10], sel=sel, out=out[10]);
    Mux(a=a[11], b=b[11], sel=sel, out=out[11]);
    Mux(a=a[12], b=b[12], sel=sel, out=out[12]);
    Mux(a=a[13], b=b[13], sel=sel, out=out[13]);
    Mux(a=a[14], b=b[14], sel=sel, out=out[14]);
    Mux(a=a[15], b=b[15], sel=sel, out=out[15]);
}
```

```hdl
// 8-bit OR gate (8개 입력 중 하나라도 1이면 1)
// 입력: in[8]
// 출력: 8개 비트의 OR 결과 (1-bit)
// 구현: 트리 구조로 단계별 OR 수행
CHIP Or8Way {
    IN in[8];
    OUT out;

    PARTS:
    Or(a=in[0], b=in[1], out=or01);
    Or(a=in[2], b=in[3], out=or23);
    Or(a=in[4], b=in[5], out=or45);
    Or(a=in[6], b=in[7], out=or67);

    Or(a=or01, b=or23, out=leftHalf);
    Or(a=or45, b=or67, out=rightHalf);

    Or(a=leftHalf, b=rightHalf, out=out);
}
```

```hdl
// 16-bit 4-to-1 Multiplexer
// 입력: a[16], b[16], c[16], d[16], sel[2]
// 출력: sel에 따라 a, b, c, d 중 하나 선택
// sel[0]으로 먼저 쌍을 선택, sel[1]로 최종 선택
CHIP Mux4Way16 {
    IN a[16], b[16], c[16], d[16], sel[2];
    OUT out[16];

    PARTS:
    Mux16(a=a, b=b, sel=sel[0], out=leftPair);
    Mux16(a=c, b=d, sel=sel[0], out=rightPair);

    Mux16(a=leftPair, b=rightPair, sel=sel[1], out=out);
}
```

```hdl
// 16-bit 8-to-1 Multiplexer
// 입력: a~h[16] (8개), sel[3]
// 출력: sel에 따라 a~h 중 하나 선택
// sel[0..1]로 각 그룹 내 선택, sel[2]로 최종 그룹 선택
CHIP Mux8Way16 {
    IN a[16], b[16], c[16], d[16],
       e[16], f[16], g[16], h[16],
       sel[3];
    OUT out[16];

    PARTS:
    Mux4Way16(a=a, b=b, c=c, d=d, sel=sel[0..1], out=leftGroup);
    Mux4Way16(a=e, b=f, c=g, d=h, sel=sel[0..1], out=rightGroup);

    Mux16(a=leftGroup, b=rightGroup, sel=sel[2], out=out);
}
```

```hdl
// 1-bit 1-to-4 Demultiplexer
// 입력: in, sel[2]
// 출력: a, b, c, d (sel에 따라 하나만 in, 나머지는 0)
// sel[1]로 먼저 분기, sel[0]으로 최종 분기
CHIP DMux4Way {
    IN in, sel[2];
    OUT a, b, c, d;

    PARTS:
    DMux(in=in, sel=sel[1], a=upperHalf, b=lowerHalf);

    DMux(in=upperHalf, sel=sel[0], a=a, b=b);
    DMux(in=lowerHalf, sel=sel[0], a=c, b=d);
}
```

```hdl
// 1-bit 1-to-8 Demultiplexer
// 입력: in, sel[3]
// 출력: a~h (sel에 따라 하나만 in, 나머지는 0)
// sel[2]로 먼저 분기, sel[0..1]로 각 그룹 내 최종 분기
CHIP DMux8Way {
    IN in, sel[3];
    OUT a, b, c, d, e, f, g, h;

    PARTS:
    DMux(in=in, sel=sel[2], a=leftGroup, b=rightGroup);

    DMux4Way(in=leftGroup, sel=sel[0..1], a=a, b=b, c=c, d=d);
    DMux4Way(in=rightGroup, sel=sel[0..1], a=e, b=f, c=g, d=h);
}
```

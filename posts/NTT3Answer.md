```hdl
// 1-bit 레지스터 (1-bit register) [cite: 2]
// 입력: in, load (1비트) [cite: 3]
// 출력: out (1비트) [cite: 4]
// 동작: load가 1(asserted)이면 레지스터의 값이 in으로 설정됨[cite: 2].
//       그렇지 않으면 레지스터는 현재 값을 유지함 (if load(t) out(t+1) = in(t), else out(t+1) = out(t))[cite: 3].

CHIP Bit {
    IN in, load;
    OUT out;

    PARTS:
    Mux(a=DFFO , b=in , sel=load , out=MuxO );
    DFF(in=MuxO , out=DFFO, out=out );
}
```


```hdl
// 16-bit 프로그램 카운터 (Program Counter)
// 입력: in[16], load, inc, reset [cite: 5]
// 출력: out[16] [cite: 5]
// 동작: reset, load, inc 신호의 우선순위에 따라 다음 클록 주기의 레지스터 값을 결정함[cite: 6].

CHIP PC {
    IN in[16], load, inc, reset;
    OUT out[16];

    PARTS:
    Inc16(in=regOut, out=incOut);
    Mux16(a=regOut, b=incOut, sel=inc, out=mux1);

    Mux16(a=mux1, b=in, sel=load, out=mux2);

    Mux16(a=mux2, b=false, sel=reset, out=mux3);

    Register(in=mux3, load=true, out=regOut, out=out);
}
```


```hdl
// 16-bit 레지스터 (16-bit register) [cite: 34]
// 입력: in[16], load [cite: 35]
// 출력: out[16] [cite: 36]
// 동작: load가 1(asserted)이면 레지스터의 값이 in으로 설정됨[cite: 34].
//       그렇지 않으면 현재 값을 유지함[cite: 35]. 16개의 Bit 칩을 병렬로 연결함[cite: 36, 37, 38, 39, 40, 41].

CHIP Register {
    IN in[16], load;
    OUT out[16];

    PARTS:
    Bit(in=in[0] , load=load , out=out[0] );
    Bit(in=in[1] , load=load , out=out[1] );
    Bit(in=in[2] , load=load , out=out[2] );
    Bit(in=in[3] , load=load , out=out[3] );
    Bit(in=in[4] , load=load , out=out[4] );
    Bit(in=in[5] , load=load , out=out[5] );
    Bit(in=in[6] , load=load , out=out[6] );
    Bit(in=in[7] , load=load , out=out[7] );
    Bit(in=in[8] , load=load , out=out[8] );
    Bit(in=in[9] , load=load , out=out[9] );
    Bit(in=in[10] , load=load , out=out[10] );
    Bit(in=in[11] , load=load , out=out[11] );
    Bit(in=in[12] , load=load , out=out[12] );
    Bit(in=in[13] , load=load , out=out[13] );
    Bit(in=in[14] , load=load , out=out[14] );
    Bit(in=in[15] , load=load , out=out[15] );
}
```

```hdl
// 8워드 메모리 (Memory of eight 16-bit registers) [cite: 12]
// 입력: in[16], load, address[3] [cite: 15]
// 출력: out[16] [cite: 15]
// 동작: load가 1이면 address로 선택된 레지스터의 값이 in으로 설정됨[cite: 13].
//       그렇지 않으면 값은 변경되지 않으며, 선택된 레지스터의 값은 out으로 방출됨[cite: 14].

CHIP RAM8 {
    IN in[16], load, address[3];
    OUT out[16];
    PARTS:
    DMux8Way(in=load, sel= address,
    a= Out0, b= Out1,
    c= Out2, d= Out3,
    e= Out4, f= Out5,
    g= Out6, h= Out7);
    Register(in=in , load=Out0 , out=R0 );
    Register(in=in , load=Out1 , out=R1 );
    Register(in=in , load=Out2 , out=R2 );
    Register(in=in , load=Out3 , out=R3 );
    Register(in=in , load=Out4 , out=R4 );
    Register(in=in , load=Out5 , out=R5 );
    Register(in=in , load=Out6 , out=R6 );
    Register(in=in , load=Out7 , out=R7 );
    Mux8Way16(
    a= R0, b= R1,
    c= R2, d= R3,
    e= R4, f= R5,
    g= R6, h= R7,
    sel= address, out=out);
}
```

```hdl
// 64워드 메모리
// 입력: in[16], load, address[6] [cite: 25]
// 출력: out[16] [cite: 25]
// 동작: 8개의 RAM8 칩을 조합하여 64개의 레지스터를 구성함[cite: 26, 27, 28].

CHIP RAM64 {
    IN in[16], load, address[6];
    OUT out[16];
    PARTS:
    DMux8Way(in=load, sel=address[3..5], a=loadA, b=loadB, c=loadC, d=loadD, e=loadE, f=loadF, g=loadG, h=loadH);

    RAM8(in=in, load=loadA, address=address[0..2], out=outA);
    RAM8(in=in, load=loadB, address=address[0..2], out=outB);
    RAM8(in=in, load=loadC, address=address[0..2], out=outC);
    RAM8(in=in, load=loadD, address=address[0..2], out=outD);
    RAM8(in=in, load=loadE, address=address[0..2], out=outE);
    RAM8(in=in, load=loadF, address=address[0..2], out=outF);
    RAM8(in=in, load=loadG, address=address[0..2], out=outG);
    RAM8(in=in, load=loadH, address=address[0..2], out=outH);

    Mux8Way16(a=outA, b=outB, c=outC, d=outD, e=outE, f=outF, g=outG, h=outH, sel=address[3..5], out=out);
}
```

```hdl
// 512워드 메모리
// 입력: in[16], load, address[9] [cite: 29]
// 출력: out[16] [cite: 29]
// 동작: 8개의 RAM64 칩을 조합하여 512개의 레지스터를 구성함[cite: 30, 31, 32].

CHIP RAM512 {
    IN in[16], load, address[9];
    OUT out[16];
    PARTS:
    DMux8Way(in=load, sel=address[6..8], a=loadA, b=loadB, c=loadC, d=loadD, e=loadE, f=loadF, g=loadG, h=loadH);

    RAM64(in=in, load=loadA, address=address[0..5], out=outA);
    RAM64(in=in, load=loadB, address=address[0..5], out=outB);
    RAM64(in=in, load=loadC, address=address[0..5], out=outC);
    RAM64(in=in, load=loadD, address=address[0..5], out=outD);
    RAM64(in=in, load=loadE, address=address[0..5], out=outE);
    RAM64(in=in, load=loadF, address=address[0..5], out=outF);
    RAM64(in=in, load=loadG, address=address[0..5], out=outG);
    RAM64(in=in, load=loadH, address=address[0..5], out=outH);

    Mux8Way16(a=outA, b=outB, c=outC, d=outD, e=outE, f=outF, g=outG, h=outH, sel=address[6..8], out=out);
}
```

```hdl
// 4K워드 메모리
// 입력: in[16], load, address[12] [cite: 7]
// 출력: out[16] [cite: 7]
// 동작: 8개의 RAM512 칩을 조합하여 4096개의 레지스터를 구성함[cite: 8, 9, 10].

CHIP RAM4K {
    IN in[16], load, address[12];
    OUT out[16];
    PARTS:
    DMux8Way(in=load, sel=address[9..11], a=loadA, b=loadB, c=loadC, d=loadD, e=loadE, f=loadF, g=loadG, h=loadH);

    RAM512(in=in, load=loadA, address=address[0..8], out=outA);
    RAM512(in=in, load=loadB, address=address[0..8], out=outB);
    RAM512(in=in, load=loadC, address=address[0..8], out=outC);
    RAM512(in=in, load=loadD, address=address[0..8], out=outD);
    RAM512(in=in, load=loadE, address=address[0..8], out=outE);
    RAM512(in=in, load=loadF, address=address[0..8], out=outF);
    RAM512(in=in, load=loadG, address=address[0..8], out=outG);
    RAM512(in=in, load=loadH, address=address[0..8], out=outH);

    Mux8Way16(a=outA, b=outB, c=outC, d=outD, e=outE, f=outF, g=outG, h=outH, sel=address[9..11], out=out);
}
```


```hdl
// 16K워드 메모리
// 입력: in[16], load, address[14] [cite: 22]
// 출력: out[16] [cite: 22]
// 동작: 4개의 RAM4K 칩을 DMux4Way와 Mux4Way16로 조합하여 16384개의 레지스터를 구성함[cite: 23, 24].

CHIP RAM16K {
    IN in[16], load, address[14];
    OUT out[16];
    PARTS:
    DMux4Way(in=load, sel=address[12..13], a=loadA, b=loadB, c=loadC, d=loadD);

    RAM4K(in=in, load=loadA, address=address[0..11], out=outA);
    RAM4K(in=in, load=loadB, address=address[0..11], out=outB);
    RAM4K(in=in, load=loadC, address=address[0..11], out=outC);
    RAM4K(in=in, load=loadD, address=address[0..11], out=outD);

    Mux4Way16(a=outA, b=outB, c=outC, d=outD, sel=address[12..13], out=out);
}
```
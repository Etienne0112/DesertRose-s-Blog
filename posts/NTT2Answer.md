```hdl
// 1-bit 반가산기 (Half Adder)
// 입력: a, b (1비트)
// 출력: sum (a+b의 LSB), carry (a+b의 MSB)
// 동작: sum = a XOR b, carry = a AND b
CHIP HalfAdder {
    IN a, b;
    OUT sum,    // Right bit of a + b
        carry;  // Left bit of a + b

    PARTS:
    Xor(a=a, b=b, out=sum);
    And(a=a, b=b, out=carry);
}
```

```hdl
// 1-bit 전가산기 (Full Adder)
// 입력: a, b, c (1비트 입력 + 자리올림)
// 출력: sum (a+b+c의 LSB), carry (a+b+c의 MSB)
// 동작: (a+b)를 먼저 계산한 후, 결과에 c를 더함
CHIP FullAdder {
    IN a, b, c;
    OUT sum,    // Right bit of a + b + c
        carry;  // Left bit of a + b + c

    PARTS:
    // 첫 번째 HalfAdder: a + b 계산
    HalfAdder(a=a, b=b, sum=sum1, carry=carry1);
    
    // 두 번째 HalfAdder: sum1 + c 계산
    HalfAdder(a=sum1, b=c, sum=sum, carry=carry2);
    
    // 최종 carry: carry1 OR carry2
    Or(a=carry1, b=carry2, out=carry);
}
```

```hdl
// 16-bit 가산기 (리플 캐리 방식)
// 입력: a[16], b[16] (16비트 수, 2의 보수 표현)
// 출력: out[16] (a + b의 결과, 최상위 캐리는 무시)
// 동작: 0번째는 HalfAdder, 1~15번째는 FullAdder 사용
CHIP Add16 {
    IN a[16], b[16];
    OUT out[16];

    PARTS:
    // 비트 0: 입력 캐리 없음
    HalfAdder(a=a[0], b=b[0],
              sum=out[0], carry=carry1);

    // 비트 1~15: 이전 단계의 캐리 입력받음
    FullAdder(a=a[1], b=b[1], c=carry1,
              sum=out[1], carry=carry2);
    FullAdder(a=a[2], b=b[2], c=carry2,
              sum=out[2], carry=carry3);
    FullAdder(a=a[3], b=b[3], c=carry3,
              sum=out[3], carry=carry4);
    FullAdder(a=a[4], b=b[4], c=carry4,
              sum=out[4], carry=carry5);
    FullAdder(a=a[5], b=b[5], c=carry5,
              sum=out[5], carry=carry6);
    FullAdder(a=a[6], b=b[6], c=carry6,
              sum=out[6], carry=carry7);
    FullAdder(a=a[7], b=b[7], c=carry7,
              sum=out[7], carry=carry8);
    FullAdder(a=a[8], b=b[8], c=carry8,
              sum=out[8], carry=carry9);
    FullAdder(a=a[9], b=b[9], c=carry9,
              sum=out[9], carry=carry10);
    FullAdder(a=a[10], b=b[10], c=carry10,
              sum=out[10], carry=carry11);
    FullAdder(a=a[11], b=b[11], c=carry11,
              sum=out[11], carry=carry12);
    FullAdder(a=a[12], b=b[12], c=carry12,
              sum=out[12], carry=carry13);
    FullAdder(a=a[13], b=b[13], c=carry13,
              sum=out[13], carry=carry14);
    FullAdder(a=a[14], b=b[14], c=carry14,
              sum=out[14], carry=carry15);
    FullAdder(a=a[15], b=b[15], c=carry15,
              sum=out[15]);
}
```

```hdl
// 16-bit 증가기
// 입력: in[16]
// 출력: in + 1의 결과
// 동작: Add16을 사용하여 in에 1을 더함
CHIP Inc16 {
    IN in[16];
    OUT out[16];

    PARTS:
    // in + 1 계산 (1을 이진수로: b[0]=1, 나머지=0)
    Add16(a=in,
          b[0]=true,  b[1]=false, b[2]=false, b[3]=false,
          b[4]=false, b[5]=false, b[6]=false, b[7]=false,
          b[8]=false, b[9]=false, b[10]=false, b[11]=false,
          b[12]=false, b[13]=false, b[14]=false, b[15]=false,
          out=out);
}
```

```hdl
// ALU (산술논리연산장치 - Arithmetic Logic Unit)
// 입력: x[16], y[16] (16비트 입력)
//       zx, nx, zy, ny, f, no (제어 신호)
// 출력: out[16] (연산 결과)
//       zr (out==0이면 1, 아니면 0)
//       ng (out<0이면 1, 아니면 0)
//
// 동작 흐름:
// 1단계: zx=1이면 x=0, nx=1이면 x=NOT(x)
// 2단계: zy=1이면 y=0, ny=1이면 y=NOT(y)
// 3단계: f=1이면 out=x+y (Add16), f=0이면 out=x&y (And16)
// 4단계: no=1이면 out=NOT(out)
// 5단계: zr과 ng 플래그 계산
CHIP ALU {
    IN  
        x[16], y[16],  // 16-bit inputs
        zx,             // zero x?
        nx,             // negate x?
        zy,             // zero y?
        ny,             // negate y?
        f,              // (x+y) or (x&y)?
        no;             // negate output?
    OUT 
        out[16],        // 16-bit output
        zr,             // is out == 0?
        ng;             // is out < 0?

    PARTS:
    // 1단계: x 전처리 (zero, negate)
    Mux16(a=x, b=false, sel=zx, out=xZero);
    Not16(in=xZero, out=xNot);
    Mux16(a=xZero, b=xNot, sel=nx, out=xProc);

    // 2단계: y 전처리 (zero, negate)
    Mux16(a=y, b=false, sel=zy, out=yZero);
    Not16(in=yZero, out=yNot);
    Mux16(a=yZero, b=yNot, sel=ny, out=yProc);

    // 3단계: 연산 선택 (ADD or AND)
    Add16(a=xProc, b=yProc, out=addRes);
    And16(a=xProc, b=yProc, out=andRes);
    Mux16(a=andRes, b=addRes, sel=f, out=fRes);

    // 4단계: 출력 후처리 (negate) + 플래그
    Not16(in=fRes, out=fNot);
    Mux16(a=fRes, b=fNot, sel=no,
          out=out, out[15]=ng, out[0..7]=outLow, out[8..15]=outHigh);

    // 5단계: zr 플래그 계산 (모든 비트의 OR, 그 후 NOT)
    Or8Way(in=outLow, out=orLow);
    Or8Way(in=outHigh, out=orHigh);
    Or(a=orLow, b=orHigh, out=orFinal);
    Not(in=orFinal, out=zr);
}
```


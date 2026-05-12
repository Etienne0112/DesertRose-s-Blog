본 블로그 작성 글들은, 강의를 목표로 하고 제작되었습니다.  
또한 작성된 글의 정보도 틀렸을 수 있으니, 주의해주세요.  


변수의 자료형에 대해 알아보자.  
크게 4가지로 나눌 수 있다.


기본 자료형.
메모리에 직접 매핑되는 가장 기본적인 타입들이다.


**1-A. 특수 목적**


void : 크기가 없다. 메모리를 직접 차지 하지 않으며 불완전한 타입이다.


std::nullptr_t : 널 포인터 리터럴 nullptr의 타입이다.


```C++
void DoSomething() {} // 반환값이 없는 함수
void* ptr = nullptr;  // 타입이 정해지지 않은 포인터
std::nullptr_t null_val = nullptr;
```
**1-B. 산술 타입**


**1-B-1. 정수형**
char, signed char, unsigned char : 문자를 저장한다. 유니코드를 위한 wchar_t등도 있다.
short, int, long, long long : 부호 있는 정수를 저장한다.
unsigned short, unsigned int, unsigned long, unsigned long long : 부호 없는 정수를 저장한다. 음수를 저장하지 않기 때문에 signed에 비해 양수 저장공간이 두배 넓다.
bool : 참 또는 거짓을 저장한다. 1비트가 아닌 1바이트를 사용한다.


```C++
char c = 'A';
int count = -10;
unsigned int u_count = 20;
bool is_valid = true;
```


**1-B-2 부동소수점형**


IEEE 754를 따르는 타입들로,  
float, double, long double 들이 기본적으로 있고,  
std::float16_t, std::float32_t, std::float64_t, std::float128_t, std::bfloat16_t 들도 있다. (C++23 확장)


```C++
float f_val = 3.14f;
double d_val = 3.1415926535;
```


**2. 복합 자료형**  
기본 타입이나 다른 복합 타입을 조합하여 메모리 상의 구조를 정의하는 타입이다.


포인터 (Pointer, T*) : 다른 타입 T의 메모리 주소를 가리킨다.  
멤버 포인터 (Pointer-to-member, T::*) : 클래스 내부의 특정 멤버 변수나 함수의 메모리 오프셋을 가리키는 특수한 포인터다.


참조 (Reference) :  
Lvalue 참조 (T&) : 메모리상에 이름과 실체가 있는 객체(Lvalue)에 대한 별칭이다.  
Rvalue 참조 (T&&, C++11) : 임시 객체에 바인딩되며, 이동 시맨틱(Move Semantics)과 완벽한 전달(Perfect Forwarding)의 핵심 타입이다.  


배열 (Array, T[N] / T[]) : 같은 타입의 데이터를 연속된 메모리 블록에 할당한다.  
함수 (Function) : 반환 타입과 매개변수 목록으로 구성된 시그니처 자체도 하나의 고유한 타입이다. (예: int(double, char))


열거형 (Enumeration) :  
enum : 범위가 지정되지 않은 기본 열거형이다 (암시적 정수 변환 허용).


enum class (C++11) : 범위가 지정된 엄격한 열거형이다 (강한 타입 체크 및 스코프 보장).  
사용자 정의 타입 (Class / Struct / Union) : 메모리 패딩(Padding)과 정렬(Alignment) 규칙을 제어하여 객체 지향 및 데이터 구조를 구현하는 타입이다.


```C++
int value = 10;
int* ptr = &value; // 포인터
int& ref = value;  // Lvalue 참조
int&& r_ref = 20;  // Rvalue 참조


struct MyStruct { int x; };
int MyStruct::* member_ptr = &MyStruct::x; // 멤버 포인터


int arr[5] = {1, 2, 3, 4, 5}; // 배열
int(*func_ptr)(int, int);     // 함수 포인터


enum class Color { Red, Green, Blue }; // 엄격한 열거형
```


**3. 시스템 아키텍처 특화 별칭**  
컴파일러 및 OS 아키텍처(32비트/64비트)에 따라 크기가 동적으로 결정되는 핵심 별칭 타입들이다. (<cstddef> 헤더)


std::size_t : sizeof 연산자의 반환 타입이다. 해당 시스템에서 생성할 수 있는 가장 큰 객체의 바이트 크기를 표현할 수 있는 부호 없는 정수다. (컨테이너 인덱싱 및 메모리 할당의 표준 단위)  
std::ptrdiff_t : 두 포인터를 뺐을 때의 거리를 나타내는 부호 있는 정수다. 메모리 주소 간의 차이를 계산할 때 사용된다.


```C++
#include <cstddef>

int arr[10];
std::size_t arr_size = sizeof(arr); // 시스템 아키텍처에 따른 최대 크기 보장
std::ptrdiff_t diff = &arr[5] - &arr[0]; // 포인터 간의 거리 계산 (5)
```


CV-한정자 (CV-Qualifiers)  
C++의 타입 시스템에서는 위의 모든 자료형에 한정자가 붙으면 컴파일러 관점에서 완전히 다른 타입으로 취급되고 오버로딩 된다. (예: int와 const int는 다른 타입이다)


const : 해당 메모리 영역의 쓰기(Write)를 방지하여 불변성을 보장한다.  
volatile : 컴파일러의 메모리 읽기/쓰기 최적화를 강제로 방지한다. 하드웨어 레지스터 제어나 MMIO(Memory-Mapped I/O) 통신 시, 레지스터 값이 외부에 의해 변경될 수 있음을 컴파일러에게 알릴 때 필수적으로 사용된다.

```C++
const int MAX_VALUE = 100; // 읽기 전용, 수정 불가
// MAX_VALUE = 200; // 컴파일 에러 발생

volatile int hardware_register; // 컴파일러 최적화 방지
// 외부 하드웨어가 값을 변경할 수 있으므로, 매번 캐시가 아닌 메모리에서 직접 읽어옴
```
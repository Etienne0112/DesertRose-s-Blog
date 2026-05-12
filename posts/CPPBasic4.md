본 블로그 작성 글들은, 강의를 목표로 하고 제작되었습니다.  
또한 작성된 글의 정보도 틀렸을 수 있으니, 주의해주세요.  


이번 글에서는 기본적인 함수 사용법에 대해 더욱 자세히 알아보자.  


```cpp
#include <iostream>

void function1(){
    std::cout << "function1!" << std::endl;
}

int main(){
    function1();
    function2();
    return 0;
}

void function2(){
    std::cout << "function2!" << std::endl;
}

```

해당 코드는 컴파일되지 않는다.  
컴파일러마다 다르겠지만,  
main.cpp:9:5: error: ‘function2’ was not declared in this scope;  
라는 에러가 뜬것을 볼 수 있다.  


우리 눈에는 `function2`가 선언 되어있는데, 왜 컴퓨터는 알지 못할까?  
C언어 및 대부분의 프로그래밍 언어는 코드를 위에서 부터 읽는다.  
즉 해당코드는 컴퓨터에게 이러한 명령을 내린다.  


function1의 선언을 읽어들여 function1을 메모리상에 만들어둔다.  
main함수가 실행되고 function1과 function2를 실행한다.  
function2의 선언을 읽어들여 function2를 메모리상에 만들어둔다.  
(Name Lookup 실패에 대한건 나중에 알아보자.)  


인간이 읽기에도 무언가 이상하지 않은가?  


function2가 선언되기도 전에 main에서 실행되려 하는것이 컴파일 에러를 일으킨것이다.

```cpp
#include <iostream>

void function1(){
    std::cout << "function1!" << std::endl;
}

void function2(){
    std::cout << "function2!" << std::endl;
}

int main(){
    function1();
    function2();
    return 0;
}

```

그러니 해당 코드는 에러를 일으키지 않을것으로 예상된다.  


또는 함수의 형태만 컴파일러에게 미리 알려주는 **선언**을 main 함수 위에 작성하고,
실제 동작을 담은 **구현**은 main 함수 아래에 작성하는 방법이 있다.


```cpp
#include <iostream>

void function1();
void function2();

int main(){
    function1();
    function2();
    return 0;
}

void function1(){
    std::cout << "function1!" << std::endl;
}

void function2(){
    std::cout << "function2!" << std::endl;
}

```
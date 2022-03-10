---
layout:  post
title: 인터셉터 in angular
tags:
- interceptor
- angular
---

## HttpInterceptor
HttpClient는 미들웨어 로직을 파이프라인에 삽입할 수 있는 인터셉터(HttpInterceptor)를 도입했다.    
Http 요청을 검사, 변환 가능하고, 요청 전후 처리가 가능하다.

intercept 메소드의 구현을 강제하는 HttpInterceptor 인터페이스를 구현해야 한다.
```typescript
export interface HttpInterceptor {
/**
* Intercept an outgoing `HttpRequest` and optionally transform it or the
* response.
*
* Typically an interceptor will transform the outgoing request before returning
* `next.handle(transformedReq)`. An interceptor may choose to transform the
* response event stream as well, by applying additional Rx operators on the stream
* returned by `next.handle()`.
*
* More rarely, an interceptor may choose to completely handle the request itself,
* and compose a new event stream instead of invoking `next.handle()`. This is
* acceptable behavior, but keep in mind further interceptors will be skipped entirely.
*
* It is also rare but valid for an interceptor to return multiple responses on the
* event stream for a single request.
*/
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
```
intercept 메소드는 2개의 파라미터를 갖는다.  
- req: 처리할 요청
- next: 다음 인터셉터를 가리키는 핸들러

이 핸들러는 HttpHandler 클래스 타입으로
HttpHandler는 [Express](https://poiemaweb.com/express-basics#4-middleware) 의 미들웨어와 유사하게 인터셉터를 체이닝 할 때 사용한다.
다음 인터셉터가 있다면 next로 전달하고,  
존재하지 않으면 HttpHandler인 HttpBackend(최종 HttpHandler)가 요청을 전송하고 옵저버블을 반환한다.  
인터셉터를 순차적으로 연결하는 역할이 HttpHandler이다.

첫번째 파라미터 HttpRequest는 이뮤터블이기 때문에 객체 내용을 변경할 수 없다.  
그래서 clone 메소드를 통해 새로운 복사본을 생성한다.
```typescript
req = req.clone({ headers: req.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`) });
req = req.clone({ headers: req.headers.append('Content-Type', 'application/json;charset=UTF-8') });
req = req.clone({ headers: req.headers.append('Accept', 'application/json') });
return next.handle(req);
```


루트 모듈의 프로바이더에 HTTP_INTERCEPTORS 프로바이더를 추가한다.
## app.module.ts
```typescript
@NgModule({
    //...
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: 정의한Interceptor,
        multi: true
    }]
}
export class AppModule {}
```

> 참고: [Angular Essentials](http://www.yes24.com/Product/Goods/62063090)

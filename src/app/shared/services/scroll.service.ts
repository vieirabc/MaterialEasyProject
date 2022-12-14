import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  smooth(end: number, duration: number, element: ElementRef<HTMLElement>) {
    const start = element.nativeElement.scrollTop;
    const distance = end - start;
    const startTime = new Date().getTime();

    const easeInOutQuart = (time: number, from: number, distance: number, duration: number) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    }

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newEnd = easeInOutQuart(time, start, distance, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      element.nativeElement.scroll(0, newEnd);
    }, 1000 / 60); // 60fps;
  }

  // smooth(endY: number, duration: number) {
  //   const startY = window.scrollY || window.pageYOffset;
  //   const distanceY = endY - startY;
  //   const startTime = new Date().getTime();

  //   // duration = typeof duration !== 'undefined' ? duration : 400;

  //   // Easing function
  //   const easeInOutQuart = (time: number, from: number, distance: number, duration: number) => {
  //     if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
  //     return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  //   };

  //   const timer = setInterval(() => {
  //     const time = new Date().getTime() - startTime;
  //     const newY = easeInOutQuart(time, startY, distanceY, duration);
  //     if (time >= duration) {
  //       clearInterval(timer);
  //     }
  //     window.scroll(0, newY);
  //   }, 1000 / 60); // 60 fps;
  // }
}

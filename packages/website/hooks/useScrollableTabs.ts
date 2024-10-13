import { useRef, useEffect, useLayoutEffect } from "react";

export const useScrollableTabs = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shadowStartRef = useRef<HTMLDivElement>(null);
  const shadowEndRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupScrolling = () => {
      const content = contentRef.current;
      const wrapper = wrapperRef.current;
      const shadowStart = shadowStartRef.current;
      const shadowEnd = shadowEndRef.current;
      const scrollbar = scrollbarRef.current;

      if (content && wrapper && shadowStart && shadowEnd && scrollbar) {
        const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;
        const scrollbarMaxLeft = wrapper.offsetWidth - scrollbar.offsetWidth;

        const handleScroll = () => {
          const currentScroll = content.scrollLeft / contentScrollWidth;
          shadowStart.style.opacity = currentScroll.toString();
          shadowEnd.style.opacity = (1 - currentScroll).toString();
          scrollbar.style.left = `${currentScroll * scrollbarMaxLeft}px`;
        };

        let isDragging = false;
        let startX: number, scrollStartLeft: number;

        const handleMouseDown = (e: MouseEvent) => {
          isDragging = true;
          startX = e.clientX;
          scrollStartLeft = scrollbar.offsetLeft;
          document.body.style.userSelect = "none";
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;
          const deltaX = e.clientX - startX;
          let newLeft = scrollStartLeft + deltaX;
          newLeft = Math.max(0, Math.min(newLeft, scrollbarMaxLeft));
          scrollbar.style.left = `${newLeft}px`;
          const scrollRatio = newLeft / scrollbarMaxLeft;
          content.scrollTo({ left: scrollRatio * contentScrollWidth });
        };

        const handleMouseUp = () => {
          isDragging = false;
          document.body.style.userSelect = "";
        };

        content.addEventListener("scroll", handleScroll);
        scrollbar.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
          content.removeEventListener("scroll", handleScroll);
          scrollbar.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }
    };

    const timeoutId = setTimeout(setupScrolling, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useLayoutEffect(() => {
    const updateScrollbarVisibility = () => {
      const content = contentRef.current;
      const wrapper = wrapperRef.current;
      const shadowEnd = shadowEndRef.current;
      const scrollbar = scrollbarRef.current;

      if (content && wrapper && shadowEnd && scrollbar) {
        const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth;
        const isOverflowing = contentScrollWidth > 0;

        if (isOverflowing) {
          shadowEnd.style.opacity = "1";
          scrollbar.style.display = "block";
          scrollbar.style.width = `${(wrapper.offsetWidth / content.scrollWidth) * 100}%`;
        } else {
          shadowEnd.style.opacity = "0";
          scrollbar.style.display = "none";
        }
      }
    };

    setTimeout(updateScrollbarVisibility, 0);

    const mutationObserver = new MutationObserver(updateScrollbarVisibility);
    const resizeObserver = new ResizeObserver(updateScrollbarVisibility);

    if (contentRef.current) {
      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        mutationObserver.disconnect();
        resizeObserver.disconnect();
      }
    };
  }, []);

  return {
    contentRef,
    wrapperRef,
    shadowStartRef,
    shadowEndRef,
    scrollbarRef,
  };
};

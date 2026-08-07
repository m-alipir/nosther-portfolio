/**
 * A GSAP stagger function for masked line reveals. A flat per-line delay
 * makes a long line arrive noticeably later than a short one animating at
 * the same speed over a longer distance, so long lines read as sluggish.
 * Scaling the delay by how much narrower a line is than the widest one in
 * the group lets every line land together instead: the widest line gets
 * (near) zero delay, narrower lines get progressively more, offsetting the
 * time they'd otherwise finish early.
 */
export function lineWidthStagger(baseStagger: number) {
  return (index: number, target: Element, list: ArrayLike<Element>) => {
    const items = Array.from(list) as HTMLElement[];
    const widest = Math.max(
      1,
      ...items.map((el) => el.scrollWidth || el.getBoundingClientRect().width),
    );
    const element = target as HTMLElement;
    const width = element.scrollWidth || element.getBoundingClientRect().width || 1;

    return baseStagger * (widest / width) * index;
  };
}

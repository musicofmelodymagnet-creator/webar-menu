export class EMAVec3 {
  private alpha: number;
  x = 0; y = 0; z = 0;
  private initialized = false;

  constructor(alpha = 0.12) {
    this.alpha = alpha;
  }

  update(x: number, y: number, z: number) {
    if (!this.initialized) {
      this.x = x; this.y = y; this.z = z;
      this.initialized = true;
      return this;
    }
    this.x += this.alpha * (x - this.x);
    this.y += this.alpha * (y - this.y);
    this.z += this.alpha * (z - this.z);
    return this;
  }

  reset() { this.initialized = false; }
}

export class EMAQuat {
  private alpha: number;
  x = 0; y = 0; z = 0; w = 1;
  private initialized = false;

  constructor(alpha = 0.12) {
    this.alpha = alpha;
  }

  update(x: number, y: number, z: number, w: number) {
    if (!this.initialized) {
      this.x = x; this.y = y; this.z = z; this.w = w;
      this.initialized = true;
      return this;
    }
    // Ensure same hemisphere to avoid flip artifacts
    const dot = this.x * x + this.y * y + this.z * z + this.w * w;
    const sign = dot < 0 ? -1 : 1;
    this.x += this.alpha * (sign * x - this.x);
    this.y += this.alpha * (sign * y - this.y);
    this.z += this.alpha * (sign * z - this.z);
    this.w += this.alpha * (sign * w - this.w);
    const len = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    this.x /= len; this.y /= len; this.z /= len; this.w /= len;
    return this;
  }

  reset() { this.initialized = false; }
}

export function generateCode(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

export function parseBearer(authorization?: string): string | null {
  if (authorization && authorization.includes('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}

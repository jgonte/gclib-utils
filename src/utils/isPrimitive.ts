/**
 * Tests whether a given object is a primitive
 * @param o The object to be tested
 */
export default function isPrimitive(o: any): boolean {
    
    return (typeof o === 'string' ||
        typeof o === 'number' ||
        typeof o === 'bigint' ||
        typeof o === 'boolean');
}
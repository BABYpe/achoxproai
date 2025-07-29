// This file contains utility functions for enhancing application security.
// In a real-world scenario, these would be more robust and likely rely on established libraries.

/**
 * Sanitizes input to prevent basic XSS attacks by escaping HTML characters.
 * @param input The string to sanitize.
 * @returns The sanitized string.
 */
export function sanitizeInput(input: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match)=>(map[match]));
}

/**
 * A conceptual function placeholder for preventing SQL Injection.
 * In a real application, this would be handled by using parameterized queries or an ORM.
 * @param query The SQL query to check.
 */
export function preventSqlInjection(query: string): void {
    // This is a conceptual example. NEVER build your own SQL sanitizer.
    const forbiddenPatterns = [/--/, /;/, /OR 1=1/, /UNION/i, /DROP/i];
    for (const pattern of forbiddenPatterns) {
        if (pattern.test(query)) {
            throw new Error("Potential SQL Injection attempt detected.");
        }
    }
}

/**
 * Validates a file based on allowed types and size.
 * @param file The file to validate.
 * @param allowedTypes An array of allowed MIME types.
 * @param maxSizeInMB The maximum allowed file size in megabytes.
 * @returns True if the file is valid, otherwise an error message string.
 */
export function validateFile(
    file: File, 
    allowedTypes: string[], 
    maxSizeInMB: number = 10
): true | string {
    if (!allowedTypes.includes(file.type)) {
        return `Invalid file type. Please upload one of: ${allowedTypes.join(', ')}.`;
    }

    if (file.size > maxSizeInMB * 1024 * 1024) {
        return `File is too large. Maximum size is ${maxSizeInMB} MB.`;
    }

    return true;
}

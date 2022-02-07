export default <T>(name: Extract<keyof T, string>): string => name;

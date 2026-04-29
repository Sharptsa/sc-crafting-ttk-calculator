export default class ObjectHelper {
    static deepClone(object: object): typeof object {
        return JSON.parse(JSON.stringify(object)) as typeof object;
    }
}

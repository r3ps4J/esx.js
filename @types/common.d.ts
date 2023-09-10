export interface PlayerData {
    accounts: Account[];
    coords: Coords;
    group: string;
    identifier: string;
    inventory: InventoryItem[];
    job: Job;
    loadout: LoadoutItem[];
    name: string;
    playerId: number;
    source: number;
    variables: Record<string, any>;
    weight: number;
    maxWeight: number;
    metadata: Record<string, any>;
}

export interface InventoryItem {
    name: string;
    count: number;
    label: string;
    weight: number;
    usable: boolean;
    rare: boolean;
    canRemove: boolean;
}

export interface Job {
    id: number;
    name: string;
    label: string;
    grade: number;
    grade_name: string;
    grade_label: string;
    grade_salary: number;
    skin_male: any[];
    skin_female: any[];
}

export interface LoadoutItem {
    name: string;
    ammo: number;
    label: string;
    components: any[];
}

export interface Coords {
    x: number;
    y: number;
    Z: number;
}

export interface Account {
    name: string;
    money: number;
    label: string;
}

export interface Weapon {
    name: string;
    label: string;
    components: WeaponComponent[];
}

export interface WeaponComponent {
    name: string;
    hash: number;
    label: string;
}

export interface Math {
    /**
     * This function rounds off a number, and optionally you can parse how many decimals you want (defaults to 0)
     * @param value
     * @param numDecimalPlaces
     */
    Round(value: number, numDecimalPlaces?: number): number;

    /**
     * This function groups numbers, making them easier to understand by humans. Used in most nofications when money is showed, for example when buying a new car at the vehicle shop.
     * @param number
     */
    GroupDigits(number: number): string;

    /**
     * This function trims an text, removing all trailing whitespaces. Often used when sanitizing the GetVehicleNumberPlateText() native.
     * @param value
     */
    Trim(value: string): string;
}

export interface Table {
    /**
     * nil proof alternative to #table
     */
    SizeOf(t: any): number;

    Set(t: any): Record<any, true>;

    IndexOf(t: any, value: any): number;

    LastIndexOf(t: any, value: any): number;

    Find(t: any, cb: (element: any) => boolean): any | undefined;

    FindIndex(t: any, cb: (element: any) => boolean): number;

    Filter<T = any>(t: T, cb: (element: any) => boolean): Partial<T>;

    Map(t: any, cb: (element: any) => any): any;

    Reverse(t: any, cb: (element: any) => boolean): any;

    Clone<T = any>(t: T): T;

    Concat<T1 = any, T2 = any>(t1: T1, t2: T2): T1 & T2;

    Join(t: any, sep: string): string;

    TableContains(tab: any, val: any): boolean;

    /**
     * Sort function for pairs
     */
    Sort<T = any>(t: T, order?: (t: T, a: any, b: any) => boolean): T;
}

export interface Common {
    /**
     * This function gets a random string, with the defined length.
     * @param length
     */
    GetRandomString(length: number): string;

    // TODO: GetConfig

    // TODO: GetWeapon

    // TODO: GetWeaponFromHash

    /**
     * This function gets the complete weapon list and label.
     */
    GetWeaponList(): Weapon[];

    /**
     * This function gets the weapon label for a given weapon
     * @param weaponName
     */
    GetWeaponLabel(weaponName: string): string;

    /**
     *
     * @param weaponName
     * @param weaponComponent
     */
    GetWeaponComponent(weaponName: string | number, weaponComponent: string): WeaponComponent;

    /**
     * This function dumps the given array to a readable string with a tree structure.
     * @param array
     */
    DumpTable(array: any[]): void;

    // TODO: Round

    Math: Math;
    Table: Table;

    /**
     * This function sets a timeout requiring two arguments, msec (milliseconds), and cb (callback).
     * @param milliseconds
     * @param callback
     * @returns Timeout id
     */
    SetTimeout(milliseconds: number, callback: () => void): number;

    /**
     * This function clears a timeout from the ESX.SetTimeout function.
     * @param id
     */
    ClearTimeout(id: number): void;
}

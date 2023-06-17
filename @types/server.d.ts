import { Account, Coords, InventoryItem, Job, LoadoutItem, PlayerData } from "./common";

declare interface JobGrade {
    grade: number;
    label: string;
    salary: number;
    skin_male: any[];
    skin_female: any[];
}

declare interface ConfigJob {
    name: string;
    label: string;
    /** Grades index by strings: `'0'`, `'1'`, `'2'` etc. */
    grades: Record<string, JobGrade>;
}

export class XPlayer implements PlayerData {
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

    /**
     * This function adds account money.
     * @param account An valid account, a list of valid accounts can be found in the configuration file
     * @param money 	Amount of money to add
     */
    addAccountMoney(account: string, money: number): void;

    /**
     * This function adds an inventory item.
     * @param item 	Item name
     * @param count Amount of item to add
     */
    addInventoryItem(item: string, count: number): void;

    /**
     * This function adds money.
     * @param money Amount of money to add
     */
    addMoney(money: number): void;

    /**
     * This function adds a weapon.
     * @param weaponName Weapon name
     * @param ammo 	Ammo count
     */
    addWeapon(weaponName: string, ammo: number): void;

    /**
     * This function adds the parsed ammo to the player weapon
     * @param weaponName Weapon name
     * @param ammoCount Ammo to add
     */
    addWeaponAmmo(weaponName: string, ammoCount: number): void;

    /**
   * This function adds a weapon component to a weapon, if the player has it, the available component list can be found in the weapon configuration file.
   * @example xPlayer.addWeapon('WEAPON_ASSAULTRIFLE', 50)
  xPlayer.addWeaponComponent('WEAPON_ASSAULTRIFLE', 'clip_drum')
   * @param weaponName 
   * @param weaponComponent 
   */
    addWeaponComponent(weaponName: string, weaponComponent: string): void;

    /**
     * This function is used to determinate if a player can carry an item, and is the successor to the previous item limit checks
     * @param item Item name
     * @param count Item count
     */
    canCarryItem(item: string, count: number): boolean;

    /**
   * This function is used to determinate if a player can swap an item for some other item.
   * @param firstItem 	First item name
   * @param firstItemCount First item count
   * @param testItem Test item name
   * @param testItemCount Test item count
   * @example if xPlayer.canSwapItem('bread', 1, 'water', 1) then
                xPlayer.removeInventoryItem('bread', 1)
                xPlayer.addInventoryItem('water', 1)
              else
                xPlayer.showNotification('You don\'t have enough inventory space.')
              end
   */
    canSwapItem(firstItem: string, firstItemCount: number, testItem: string, testItemCount: number): boolean;

    /**
     * @param index Index or table of indexes to clear
     */
    clearMeta(index: string | string[]): void;

    /**
     * @param index Meta index
     * @param subIndex Met sub index
     */
    getMeta(index?: string, subIndex?: string): any;

    /**
     * This function gets details (returned in an table) for an account.
     * @param account
     */
    getAccount(account: string): Account;

    /**
     * The returned table contains an index-value table of all accounts, and for each child there is a key-value tabl with the following content:
     * @field name - Account name
     * @field money - Account balance
     * @field label - Account label
     */
    getAccounts(): Account[];

    /**
     * TODO: Asked about serialization over events, need to test
     * This function returns the player's current coordinates on the server. The optional boolean useVector argument is for returning a vector3 type. Keep in mind that the coords sync interval can be adjusted in the configuration file in case you want to get precise player coords.
     * @param useVector Returns an vector3 type if set to true, and normally a table with x, y and z pairs
     */
    getCoords(useVector: boolean): Coords;

    /**
     * This function gets the current player group.
     */
    getGroup(): string;

    /**
     * This function returns the Rockstar identifier used
     */
    getIdentifier(): string;

    /**
     * This function returns the entire player inventory.
     * @param minimal Return inventory in a key-value table where key is item name, and only add items with count over 0 to that table.
     */
    getInventory(minimal: boolean): InventoryItem[];

    /**
     * This function gets an inventory item.
     * @param item Item name
     */
    getInventoryItem(item: string): InventoryItem;

    /**
     * This function returns the current player job object.
     */
    getJob(): Job;

    /**
     * This function returns an array of Loadout Items
     * @param minimal Whether to return items that have a count > 0
     */
    getLoadout(minimal?: boolean): LoadoutItem[];

    /**
     * This function gets the current cash balance.
     */
    getMoney(): number;

    /**
     * This function returns the player name.
     */
    getName(): string;

    /**
   * This functions returns the loadoutNum and a weapon object for the weapon if the player has it.
   * @param weaponName 
   * @example 
   const {loadoutNum, weapon} = xPlayer.getWeapon('WEAPON_PISTOL')

    if (weapon) {
        console.log(xPlayer.loadout[loadoutNum].label)
    } else {
        console.log('weapon not found!')
    }
   */
    getWeapon(weaponName: string): [number, LoadoutItem];

    /**
     * This function Returns the tint index of the specified weapon from the Player.
     * @param weaponName Weapon name
     */
    getWeaponTint(weaponName: string): number;

    /**
     * This functions returns the current player weight in a number type, can be used to do calculations.
     */
    getWeight(): number;

    /**
     * This functions checks if the player has the specified item, if they do, it will return item and item count :)
     * @param item Item name
     */
    hasItem(item: string): [InventoryItem, number];

    /**
     * This functions returns if the player has the specified weapon.
     * @param weaponName
     */
    hasWeapon(weaponName: string): boolean;

    /**
     * This functions returns an boolean if the player has the specified weapon component for a given weapon. The available component list can be found in the weapon configuration file (config.weapons.lua).
     * @param weaponName
     * @param weaponComponent
     */
    hasWeaponComponent(weaponName: string, weaponComponent: string): boolean;

    /**
     * This function kicks a player with a reason.
     * @param reason Kick reason, will be shown to player
     */
    kick(reason?: string): void;

    /**
     * This function removes account money.
     * @param account Valid accounts can be found in configuration file
     * @param money Amount of money
     */
    removeAccountMoney(account: string, money: number): void;

    /**
     * This function removes an inventory item.
     * @param item Item name, valid items can be found in database table items
     * @param count Amount of the item to remove
     */
    removeInventoryItem(item: string, count: number): void;

    /**
     * Removes money from a player's cash account.
     * @param money Amount of money to remove
     */
    removeMoney(money: number): void;

    /**
     * This function removes a weapon from the player.
     * @param weaponName Weapon name
     */
    removeWeapon(weaponName: string): void;

    /**
     * This function removes the parsed ammo to the player weapon
     * @param weaponName Weapon name
     * @param ammoCount Ammo count
     */
    removeWeaponAmmo(weaponName: string, ammoCount: number): void;

    /**
     * This function removes a weapon component from a player, if the player has it. The available component list can be found in the weapon configuration file (config.weapons.lua).
     * @param weaponName Weapon name
     * @param weaponComponent Weapon component
     */
    removeWeaponComponent(weaponName: string, weaponComponent: string): void;

    /**
     * Sets a value in the player's metadata.
     * @param index Meta index
     * @param value Meta value
     * @param subValue Meta subvalue
     */
    setMeta(index: string, value: any, subValue?: string): void;

    /**
     * This function sets money for an account.
     * @param account Valid accounts can be found in configuration file
     * @param money Amount of money
     */
    setAccountMoney(account: string, money: number): void;

    /**
     * This function sets the player's coords (teleports)
     * @param coords The coords to be teleported to. Supports both vector3 and table types. If using a table type you can also specify `heading` to set the entity heading upon teleportation
     */
    setCoords(coords: Coords & { heading?: number }): void;

    /**
     * This function sets an inventory item count
     *
     * WARNING: This function will not check if the player weight limit exceeds. Recommended to use in comibation with xPlayer.canCarryItem(item, count)
     * @param item Item name, valid items can be found in database table items
     * @param count New item count
     */
    setInventoryItem(item: string, count: number): void;

    /**
     * This functions sets the player job, the job must be defined in the `jobs` database table.
     * @param name Job name
     * @param grade Job grade
     */
    setJob(name: string, grade: string | number): void;

    /**
   * This functions sets the max weight that the player can hold in their inventory.
   * @param newWeight New max weight
   * @example 
    // Adds 30 to the max weight if they are police :)
    if (xPlayer.job.name == 'police') {
      xPlayer.setMaxWeight(ESX.GetConfig().MaxWeight + 30)
    }
   */
    setMaxWeight(newWeight: number): void;

    /**
     * This function sets the player cash balance.
     * @param money New money amount
     */
    setMoney(money: number): void;

    /**
     * This function sets the player name.
     * @param newName New player name
     */
    setName(newName: string): void;

    /**
     * This function sets the player weapon tint from the tint index
     * @param weaponName Weapon name
     * @param weaponTintIndex Weapon tint index
     */
    setWeaponTint(weaponName: string, weaponTintIndex: number): void;

    /**
     * This function shows a help notification with a message. These help notification support displaying button inputs, see this list
     * @param msg The message to display
     * @param thisFrame Only show this frame? Should be used with scripts that show notifications in a loop
     * @param beep Play the beep sound?
     * @param duration Duration to show the help notification in milliseconds
     */
    showHelpNotification(msg: string, thisFrame: boolean, beep: boolean, duration: number): void;

    /**
     * This function shows a basic notification to the player.
     * @param msg The message to display
     */
    showNotification(msg: string): void;

    /**
     * This function triggers an client event for the player.
     * @param eventName Event name
     * @param args Variable number of arguments
     */
    triggerEvent(eventName: string, ...args: any[]): void;

    /**
     * This is an internal function used to update player coords, DO NOT USE IT.
     */
    updateCoords(): void;
}

export class OneSync {
    /**
     * An async function that creates server-sided objects.
     *
     * **Note:** CreateObject is a RPC (Remote Procedure Call) Native, which means that it requres there to be a valid client nearby for it to be able to spawn!
     * @param model Model of the object - can either be a string or a hash
     * @param coords The coords where the object should be spawned.
     * @param heading The heading the object will be facing
     * @param cb The returned function when the vehicle has been spawned. The invoked function has 1 argument which is the entity's network id.
     */
    SpawnObject(model: string | number, coords: Coords, heading: number, cb?: (netId: number) => void): void;

    /**
     * An async function that creates server-sided peds.
     *
     * **Note:** CreateObject is a RPC (Remote Procedure Call) Native, which means that it requres there to be a valid client nearby for it to be able to spawn!
     * @param model Model of the ped - can either be a string or a hash
     * @param coords The coords where the ped should be spawned.
     * @param heading The heading the ped will be facing
     * @param cb The returned function when the ped has been spawned. The invoked function has 1 argument which is the ped's network id.
     */
    SpawnPed(model: string | number, coords: Coords, heading: number, cb?: (netId: number) => void): void;

    /**
     * An async function that creates a server-sided ped and then places them into a specific vehicle.
     *
     * **Note:** CreateObject is a RPC (Remote Procedure Call) Native, which means that it requres there to be a valid client nearby for it to be able to spawn!
     * @param model Model of the ped - can either be a string or a hash
     * @param vehicle The handle of the vehicle the ped will be spawned into
     * @param seat Seat index that the ped will be sat in
     * @param cb The returned function when the ped has been spawned. The invoked function has 1 argument which is the ped's network id.
     */
    SpawnPedInVehicle(model: string | number, vehicle: number, seat: number, cb?: (netId: number) => void): void;

    /**
     *
     * @param model You can either specify a model, for example `blista`, or a vehicle hash.
     * @param coords The coords where the vehicle should be spawned. You can also parse a vector type without any issues
     * @param heading The heading to spawn the vehicle at
     * @param Properties Sets the properties that the vehicle spawns with uses the same structure as `ESX.Game.SetVehicleProperties`
     * @param cb The returned function when the vehicle has been spawned. The invoked function has 1 argument which is the **NetId** of the vehicle
     */
    SpawnVehicle(
        model: string | number,
        coords: Coords,
        heading: number,
        Properties?: any,
        cb?: (netId: number) => void
    ): void;
}

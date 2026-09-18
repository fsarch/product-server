/**
 * Convention (matches other fsarch services):
 * - read_<resource>   : Reading <resource>
 * - write_<resource>  : Creating/updating <resource>
 * - delete_<resource> : Deleting <resource>
 */
export enum Role {
  read_catalog = 'read_catalog',
  read_item_type = 'read_item_type',
  read_attribute = 'read_attribute',
  read_item = 'read_item',
}

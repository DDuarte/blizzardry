r = require('restructure')
Entity = require('../entity')
LocalizedStringRef = require('../localized-string-ref')
StringRef = require('../string-ref')

module.exports = Entity(
  id: r.uint32le
  name: LocalizedStringRef
  internalName: StringRef
  spellItemEnchantmentIDs: new r.Array(r.uint32le, 5)
  allocationPcts: new r.Array(r.uint32le, 5)
)

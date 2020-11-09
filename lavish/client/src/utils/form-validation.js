export const isEmail = email => {
  const hasAt = email.includes("@")
  let hasDomainExt = false
  if (hasAt) {
    const domainExt = email.split("@")[1]
    hasDomainExt = domainExt.includes(".")
      ? domainExt.split(".")[1].length > 1
      : false
  }
  return hasAt && hasDomainExt
}

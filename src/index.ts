/*
  Made by Qaxt
  See LICENSE
*/

function type(data) {
  if (typeof data === 'function') {
    return 0
  } else if (Array.isArray(data)) {
    return 1
  } else if (typeof data === 'object') {
    return 2
  } else if (typeof data === 'string') {
    return 3
  } else if (typeof data === 'number') {
    return 4
  }
}

export function chunk(a: any[], n: number) {
  if (n) {
    n = Math.abs(n)
  } else {
    n = 1
  }
  const chunks = []
  for (let i = 0; i < a.length; i+= n) {
    chunks.push(a.slice(i, i + n))
  }
  return chunks
}

export function distill(a: object[], rule: any) {
  if (type(rule) === 1) {
    return [a.filter(x => this.matchesProperty(rule[0], rule[1])(x)), a.filter(x => !this.matchesProperty(rule[0], rule[1])(x))]
  } else if (type(rule) === 2) {
    return [a.filter(x => this.matches(rule)(x)), a.filter(x => !this.matches(rule)(x))]
  } else if (type(rule) === 3) {
    return [a.filter(x => this.property(rule)(x)), a.filter(x => !this.property(rule)(x))]
  } else {
    return [a.filter(x => rule(x, a)), a.filter(x => !rule(x, a))]
  }
}

export function equal(...items: any[]) {
  for (let i = 0; i < items.length - 1; i++) {
    if (items[i] !== items[i + 1]) {
      if (type(items[i]) === type(items[i + 1])) {
        if (type(items[i]) === 1) {
          for (let j = 0; j < Math.max(items[i].length, items[i + 1].length); j++) {
            if (!this.equal(items[i][j], items[i + 1][j])) return false
          }
        } else if (type(items[i]) === 2) {
          if (Object.keys(items[i]).length === Object.keys(items[i + 1]).length) {
            for (const [key, value] of Object.entries(items[i])) {
              if (items[i + 1][key] !== value && !this.equal(items[i + 1][key], value)) return false
            }
          } else {
            return false
          }
        } else if (type(items[i]) === 3) {
          if (items[i].toLowerCase() !== items[i + 1].toLowerCase()) return false
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
  return true
}

export function exclude(...arrays: any[][]) : any[] {
  let all = []
  for (const a of arrays) {
    all = all.concat(a)
  }
  const track = []
  const inter = []
  for (const item of all) {
    ((this.includes(track, item)) ? inter.push(item) : track.push(item))
  }
  return all.filter(x => !this.includes(inter, x))
}

export function filter(a: object[], rule: any) {
  if (type(rule) === 1) {
    return a.filter(x => this.matchesProperty(rule[0], rule[1])(x))
  } else if (type(rule) === 2) {
    return a.filter(x => this.matches(rule)(x))
  } else if (type(rule) === 3) {
    return a.filter(x => this.property(rule)(x))
  } else {
    return a.filter(x => rule(x, a))
  }
}

export function includes(a: any[], item: any) : boolean {
  for (let i = 0; i < a.length; i++) {
    if (this.equal(a[i], item)) return true
  }
  return false
}

export function intersect(...arrays: any[][]) : any[] {
  let all = []
  for (const a of arrays) {
    all = all.concat(a)
  }
  return all.filter((x) => {
    for (const a of arrays) {
      if (!this.includes(a, x)) {
        return false
      }
    }
    return true
  })
}

export function mapKeys(o: object, rule: (key: any, value: any) => any) {
  let thing = {}
  for (const [key, value] of Object.entries(o)) {
    thing[rule(key, o[key])] = o[key]
  }
  return thing
}

export function mapValues(o: object, rule: (value: any) => any) {
  let thing = {}
  for (const [key, value] of Object.entries(o)) {
    thing[key] = rule(o[key])
  }
  return thing
}

export function matches(rule: object) {
  return (o: object) => {
    for (const [key, value] of Object.entries(rule)) {
      if (o[key] !== value && !this.equal(o[key], value)) return false
    }
    return true
  }
}

export function matchesProperty(key: string | number, value: any) {
  return (o: object) => {
    return this.equal(o[key], value)
  }
}

export function must(rule: object) {
  return (o: object) => {
    for (const [key, value] of Object.entries(rule)) {
      if (type(value) === 3) {
        if (!(new Function(`return ${JSON.stringify(o[key])}${value}`)())) return false
      } else if (type(value) === 1) {
        let s = ''
        for (let i = 1; i < value.length; i++) {
          if (i - 1) {
            s += `${value[0]}(${JSON.stringify(o[key])}${value[i]})`
          } else {
            s += `(${JSON.stringify(o[key])}${value[i]})`
          }
        }
        if (!(new Function(`return ${s}`)())) return false
      }
    }
    return true
  }
}

export function property(key) {
  return (o: object) => {
    return o[key]
  }
}

export function subtract(target: any[], ...arrays: any[][]) : any[] {
  let sub = []
  for (const a of arrays) {
    sub = sub.concat(a)
  }
  return target.filter((x) => {
    return !this.includes(sub, x)
  })
}

export function unite(...arrays: any[][]) : any[] {
  let unision = []
  for (const a of arrays) {
    unision = unision.concat(a)
  }
  return unision
}
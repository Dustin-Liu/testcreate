(()=>{var __webpack_modules__={7799:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){function adopt(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,a){function fulfilled(e){try{step(n.next(e))}catch(e){a(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){a(e)}}function step(e){e.done?r(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};var a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const i=a(r(2186));const o=a(r(5622));const s=a(r(1518));const c=a(r(8245));const u=r(6490);class ValidationError extends Error{constructor(e){super(e);this.name="ValidationError";Object.setPrototypeOf(this,ValidationError.prototype)}}t.ValidationError=ValidationError;class ReserveCacheError extends Error{constructor(e){super(e);this.name="ReserveCacheError";Object.setPrototypeOf(this,ReserveCacheError.prototype)}}t.ReserveCacheError=ReserveCacheError;function checkPaths(e){if(!e||e.length===0){throw new ValidationError(`Path Validation Error: At least one directory or file path is required`)}}function checkKey(e){if(e.length>512){throw new ValidationError(`Key Validation Error: ${e} cannot be larger than 512 characters.`)}const t=/^[^,]*$/;if(!t.test(e)){throw new ValidationError(`Key Validation Error: ${e} cannot contain commas.`)}}function restoreCache(e,t,r,a){return n(this,void 0,void 0,(function*(){checkPaths(e);r=r||[];const n=[t,...r];i.debug("Resolved Keys:");i.debug(JSON.stringify(n));if(n.length>10){throw new ValidationError(`Key Validation Error: Keys are limited to a maximum of 10.`)}for(const e of n){checkKey(e)}const l=yield s.getCompressionMethod();const p=yield c.getCacheEntry(n,e,{compressionMethod:l});if(!(p===null||p===void 0?void 0:p.archiveLocation)){return undefined}const d=o.join(yield s.createTempDirectory(),s.getCacheFileName(l));i.debug(`Archive Path: ${d}`);try{yield c.downloadCache(p.archiveLocation,d,a);if(i.isDebug()){yield u.listTar(d,l)}const e=s.getArchiveFileSizeIsBytes(d);i.info(`Cache Size: ~${Math.round(e/(1024*1024))} MB (${e} B)`);yield u.extractTar(d,l);i.info("Cache restored successfully")}finally{try{yield s.unlinkFile(d)}catch(e){i.debug(`Failed to delete archive: ${e}`)}}return p.cacheKey}))}t.restoreCache=restoreCache;function saveCache(e,t,r){return n(this,void 0,void 0,(function*(){checkPaths(e);checkKey(t);const n=yield s.getCompressionMethod();i.debug("Reserving Cache");const a=yield c.reserveCache(t,e,{compressionMethod:n});if(a===-1){throw new ReserveCacheError(`Unable to reserve cache with key ${t}, another job may be creating this cache.`)}i.debug(`Cache ID: ${a}`);const l=yield s.resolvePaths(e);i.debug("Cache Paths:");i.debug(`${JSON.stringify(l)}`);const p=yield s.createTempDirectory();const d=o.join(p,s.getCacheFileName(n));i.debug(`Archive Path: ${d}`);yield u.createTar(p,l,n);if(i.isDebug()){yield u.listTar(d,n)}const m=5*1024*1024*1024;const f=s.getArchiveFileSizeIsBytes(d);i.debug(`File Size: ${f}`);if(f>m){throw new Error(`Cache size of ~${Math.round(f/(1024*1024))} MB (${f} B) is over the 5GB limit, not saving cache.`)}i.debug(`Saving Cache (ID: ${a})`);yield c.saveCache(a,d,r);return a}))}t.saveCache=saveCache},8245:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){function adopt(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,a){function fulfilled(e){try{step(n.next(e))}catch(e){a(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){a(e)}}function step(e){e.done?r(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())}))};var a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const i=a(r(2186));const o=r(9925);const s=r(3702);const c=a(r(6417));const u=a(r(5747));const l=r(8835);const p=a(r(1518));const d=r(8840);const m=r(5500);const f=r(6215);const h=r(3981);const g="1.0";function getCacheApiUrl(e){const t=(process.env["ACTIONS_CACHE_URL"]||process.env["ACTIONS_RUNTIME_URL"]||"").replace("pipelines","artifactcache");if(!t){throw new Error("Cache Service Url not found, unable to restore cache.")}const r=`${t}_apis/artifactcache/${e}`;i.debug(`Resource Url: ${r}`);return r}function createAcceptHeader(e,t){return`${e};api-version=${t}`}function getRequestOptions(){const e={headers:{Accept:createAcceptHeader("application/json","6.0-preview.1")}};return e}function createHttpClient(){const e=process.env["ACTIONS_RUNTIME_TOKEN"]||"";const t=new s.BearerCredentialHandler(e);return new o.HttpClient("actions/cache",[t],getRequestOptions())}function getCacheVersion(e,t){const r=e.concat(!t||t===d.CompressionMethod.Gzip?[]:[t]);r.push(g);return c.createHash("sha256").update(r.join("|")).digest("hex")}t.getCacheVersion=getCacheVersion;function getCacheEntry(e,t,r){return n(this,void 0,void 0,(function*(){const a=createHttpClient();const o=getCacheVersion(t,r===null||r===void 0?void 0:r.compressionMethod);const s=`cache?keys=${encodeURIComponent(e.join(","))}&version=${o}`;const c=yield h.retryTypedResponse("getCacheEntry",(()=>n(this,void 0,void 0,(function*(){return a.getJson(getCacheApiUrl(s))}))));if(c.statusCode===204){return null}if(!h.isSuccessStatusCode(c.statusCode)){throw new Error(`Cache service responded with ${c.statusCode}`)}const u=c.result;const l=u===null||u===void 0?void 0:u.archiveLocation;if(!l){throw new Error("Cache not found.")}i.setSecret(l);i.debug(`Cache Result:`);i.debug(JSON.stringify(u));return u}))}
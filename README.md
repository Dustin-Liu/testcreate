sccache for GitHub Actions - speedup your Rust project build
============================================================

This repository provides GitHub Actions which enables projects to cache the compiled ouotput using
[sccache](https://github.com/mozilla/sccache).

Usage
-----

```yaml
- name: Configure sccache
  uses: visvirial/sccache-action@v1
  with:
    # O
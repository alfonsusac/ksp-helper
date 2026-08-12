<!-- Make sure Parameters have type -->

### **POST /api/login**

Logs into Spacedock.

*Curl*

```shell
curl -F username=SirCmpwn -F password=example -c ./cookies "https://spacedock.info/api/login"
```

*Parameters (Form Data)*
*Parameters (Search Params)*

* `username: string`
* `password: string`
* `game_id`: Only return mods for this game, by internal database id [*optional*]
* `game_version`: Only return mods for this game version, by friendly string [*optional*]
* `game_version_id`: Only return mods for this game version, by internal database id [*optional*]
* `page`: Which page of results to retrieve (1 indexed) [*optional*]
* `orderby`: Which property of mod use for ordering. Valid values: name, updated, created. Default: created. [*optional*]
* `order`: Which ordering direction to use. Valid values: asc, desc. Default: asc. [*optional*]
* `count`: Which count of mods to show per page. Valid values: 1-500. Default 30. [*optional*]

<details><summary><i>Example Response</i></summary>

```json
// Paste Code Here
```
</details>

<details><summary><i>Errors</i></summary>

| Code | Reason | 
| --- | --- |
| 401 | Missing username or password |
| 401 | Username or password is incorrect |
| 403 | User is not confirmed |
</details>
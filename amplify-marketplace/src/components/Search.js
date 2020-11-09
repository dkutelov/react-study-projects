import React from "react"
import { Form, Button, Input } from "element-react"
export default function Search({
  handleSearch,
  searchTerm,
  handleSearchChange,
  handleClearSearch,
  isSearching
}) {
  return (
    <Form inline={true} onSubmit={handleSearch} style={{ textAlign: "center" }}>
      <Form.Item>
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search markets ..."
          icon="circle-cross"
          onIconClick={handleClearSearch}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="info"
          icon="search"
          onClick={handleSearch}
          loading={isSearching}
          disabled={!searchTerm}>
          Search
        </Button>
      </Form.Item>
    </Form>
  )
}

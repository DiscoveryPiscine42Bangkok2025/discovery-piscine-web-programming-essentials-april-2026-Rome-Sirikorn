#!/bin/bash

# วนลูปตามจำนวนอาร์กิวเมนต์ที่ส่งเข้ามา
for name in "$@"; do
    # สร้างชื่อโฟลเดอร์ใหม่โดยเติม ex ไว้ข้างหน้า
    folder_name="ex$name"
    
    # สร้างโฟลเดอร์ (ใช้ -p เพื่อป้องกัน Error หากโฟลเดอร์มีอยู่แล้ว)
    mkdir -p "$folder_name"
    
    echo "Created folder: $folder_name"
done


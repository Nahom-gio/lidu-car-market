"use client";

import {useRef, useState} from "react";
import {Button, Card, Flex, Stack, Text} from "@sanity/ui";
import {set, useClient} from "sanity";

type ImageItem = {
  _key: string;
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

export function CarImagesInput(props: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const client = useClient({apiVersion: "2024-01-01"});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const asset = await client.assets.upload("image", file, {
            filename: file.name,
          });

          return {
            _key: crypto.randomUUID(),
            _type: "image" as const,
            asset: {
              _type: "reference" as const,
              _ref: asset._id,
            },
          };
        }),
      );

      props.onChange(set([...(props.value ?? []), ...uploaded]));
      event.target.value = "";
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Stack space={4}>
      <Card padding={3} radius={2} tone="transparent" border>
        <Stack space={3}>
          <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Bulk Upload Car Images
              </Text>
              <Text size={1} muted>
                Select multiple files at once. The first image will be used as the cover image on the website.
              </Text>
            </Stack>
            <Button
              text={isUploading ? "Uploading..." : "Upload Multiple Images"}
              tone="primary"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
            />
          </Flex>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{display: "none"}}
          />
          {uploadError ? <Text size={1}>{uploadError}</Text> : null}
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
